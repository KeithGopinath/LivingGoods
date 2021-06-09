/* eslint-disable */
import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { ExportToCsv } from 'export-to-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faMobile } from '@fortawesome/free-solid-svg-icons';
import Headerbar from '../../components/HeaderBar';
import Sidebar from '../../components/SideBar';
import { history } from '../../routes';
import Card from '../../components/Card';
import Button from '../../components/CustomButton';
import { getDevicesRequest } from '../../actionCreators/DevicesList';
import { getDevicesSearchRequest } from '../../actionCreators/DeviceSearch';
import { removeUnderscore, replaceNull } from '../../utils/containerFunctions';
import Loader from '../../components/Loader';
import { deviceArchiveRequest } from '../../actionCreators/DeviceArchive';
import { deviceActivateRequest } from '../../actionCreators/DeviceActivate';

class DevicesList extends Component {
  state = {
    searchDevice: '',
    searchState: false,
  }

  componentDidMount() {
    this.props.getDevicesRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.deviceActivate !== this.props.deviceActivate || prevProps.deviceArchive !== this.props.deviceArchive) {
      this.props.getDevicesRequest();
    }
  }

  exportDevices = (devices) => {
    // Field to be displayed in CSV
    const deviceList = devices.map((item) => ({
      id: item.id,
      active: item.active,
      device: item.name,
      deviceIdentifier: item.deviceIdentifier,
      phoneNumber: item.phoneNumber,
      status: item.mdmDeviceStatus,
      username: item.user.username,
      uuid: item.user.uuid,
      // branch: item.user.branch.branchName,
      // country: item.user.country.countryName,
    }))

    const options = {
      filename: 'Devices list',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(deviceList);
  }

  viewDevices = (item) => {
    const { original } = item;
    history.push({
      pathname: '/devices-view', state: original,
    });
  }

  viewUsers = (item) => {
    const { user } = item.original;
    history.push({
      pathname: '/users-view/',
      state: user,
    });
  }

  // Method for Case insensitive search
  searchMethod = (filter, row) => {
    const { id } = filter;
    return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
  }

  searchChange = (e) => {
    if (/^(?![\s-])[\A-Za-z0-9_@./#&+-\s-]*$/.test(e.target.value)) {
      this.setState({
        searchDevice: e.target.value,
      });
    }
    if (e.target.value.length === 0) {
      this.setState({ searchState: false });
    }
  }

  searchDevice = () => {
    const { searchDevice } = this.state;
    this.props.getDevicesSearchRequest(searchDevice);
    this.setState({ searchState: true });
  }

  clearSearch = () => {
    this.setState({ searchDevice: '' });
    this.setState({ searchState: false });
  }

  SearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchDevice()
    }
  }

  render() {
    const { searchDevice, searchState } = this.state;
    const { devices, devicesLoading } = this.props.devices;
    const { deviceSearch, deviceSearchLoading } = this.props.deviceSearch;
    const loading = devicesLoading || deviceSearchLoading;
    let deviceData = searchState ? deviceSearch : devices;
    deviceData = deviceData && replaceNull(deviceData);
    deviceData = removeUnderscore(deviceData);

    // To show empty values as --
    deviceData && deviceData.map((item) => {
      if (item.deviceInfo !== null) {
        const obj = item.deviceInfo;
        for (const key in obj) {
          if (obj[key] === null || RegExp(/^ *$/).test(obj[key])) {
            obj[key] = '--';
          }
        }
        return obj;
      } else if (item.deviceInfo === null) {
        return item.deviceInfo = '--';
      }
    });

    // fuction for Phonenumber field
    deviceData && deviceData.map((item) => {
      if (item.deviceInfo === '--') {
        return item.phoneNumber = item.deviceInfo;
      }
      return item.phoneNumber = item.deviceInfo.Phone_Number;
    });

    return (
      <div className="wrapper">
        <Sidebar history={history} />
        <div className="main-panel">
          <Headerbar headerName="Devices" />
          <div className="main-content">
            {loading && <Loader />}
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <div className="clearfix">
                    <div className="pull-left mb-4">
                      <h4 className="title vmiddle mt-4">Devices list</h4>
                      <div className="vmiddle custom-search-box ml-4">
                        <input type="text" placeholder="Search Devices" value={searchDevice} onChange={this.searchChange} onKeyPress={this.SearchKeyPress} />
                        {searchDevice ?
                          <div className="vmiddle custom-search-box ml-4">
                            <i className="fa fa-close" id="clearicon" onClick={this.clearSearch}></i>
                            <button type="button" onClick={this.searchDevice}><i className="fa fa-search"></i></button>
                          </div>
                          : null}
                      </div>
                    </div><div className="pull-right">
                      <Button block variant="secondary" className="btn-fill table-button mr-4" onClick={() => this.exportDevices(devices)}>Export devices</Button>
                    </div>
                  </div>
                  <Card
                    title=""
                    content={
                      <ReactTable
                        data={deviceData}
                        filterable
                        columns={[
                          {
                            Header: 'Device',
                            accessor: 'name',
                          },
                          {
                            Header: 'Device Identifier',
                            accessor: 'deviceIdentifier',
                          },
                          {
                            Header: 'Phone Number',
                            accessor: 'phoneNumber',
                          },
                          {
                            Header: 'Status',
                            accessor: 'mdmDeviceStatus',
                          },
                          {
                            Header: 'Actions',
                            accessor: 'actions',
                            filterable: false,
                            sortable: false,
                            Cell: (original) => (
                              <div className="actions-centre">
                                <Button bsStyle="warning" simple onClick={() => this.viewDevices(original)}>
                                  <FontAwesomeIcon icon={faEye} title="View Device" />
                                </Button>
                                <Button bsStyle="warning" simple onClick={() => this.viewUsers(original)} >
                                  <FontAwesomeIcon icon={faUser} title="View Owner" />
                                </Button>
                              </div>),
                          },
                        ]}
                        defaultPageSize={10}
                        showPaginationBottom
                        className="-striped -highlight"
                        defaultFilterMethod={this.searchMethod}
                      />
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  devices: state.devicesState,
  deviceSearch: state.deviceSearchState,
  deviceActivate: state.deviceActivateState,
  deviceArchive: state.deviceArchiveState,
  login: state.loginState,
});

const mapDispatchToProps = (dispatch) => ({
  getDevicesRequest: () => dispatch(getDevicesRequest()),
  getDevicesSearchRequest: (searchDevice) => dispatch(getDevicesSearchRequest(searchDevice)),
  deviceArchiveRequest: (id) => dispatch(deviceArchiveRequest(id)),
  deviceActivateRequest: (id) => dispatch(deviceActivateRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DevicesList);
