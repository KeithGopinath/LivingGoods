/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import ReactTable from 'react-table';
import { Col, Row, Tab, Nav, NavItem } from 'react-bootstrap';
import AuditLog from '../../containers/AuditLog';
import OperationsLog from '../../containers/OperationsLog';
import DeviceStatus from '../../containers/DeviceStatus';
import LocationLog from '../../containers/LocationLog';
import DeviceValidity from '../../containers/DeviceValidity';
import Loader from '../Loader';
import { removeUnderscore } from '../../utils/containerFunctions';

const CustomTable = ({ info, ViewDeviceTabs, applicationList, deviceId, deviceStatus, devicesIdLoading, validUntilDate }) => {
  const applications = applicationList ? applicationList.applications : [];
  const login = useSelector((state) => state.loginState.login);
  // Modify applications list object
  const applicationsModified = () => {
    const result = applications ? applications.map((item, index) => ({
      index: index + 1,
      name: item.name.replace(/%20/g, ' '),
      version: item.version,
      applicationIdentifier: item.applicationIdentifier,
    })) : null;
    return result;
  };

  // Device info data
  let deviceInfo = []
  for (let key in info) {
    info[key] &&
      deviceInfo.push(Object.assign({ value: info[key].toString(), key: key }))
  }
  deviceInfo = removeUnderscore(deviceInfo);
  deviceInfo = deviceInfo.map((item, index) => ({
    index: index + 1,
    value: item.value,
    key: item.key
  }))

  const rolename = login ? login.roleName : sessionStorage.rolename
  const role = rolename === 'ADMIN' ? true : false

  return (
    <Tab.Container id="tabs-with-dropdown" defaultActiveKey="DeviceInformation">
      <Row className="clearfix">
        <Col sm={12}>
          <Nav bsStyle="tabs">
            {ViewDeviceTabs && ViewDeviceTabs.map((val) => (
              <NavItem eventKey={val.eventKey}
                disabled={val.eventKey == "DeviceStatus" || val.eventKey == "DeviceValidity" ? role : false} >
                <i className={val.className} />
                {val.tabHeader}
              </NavItem>))}
          </Nav>
        </Col>
        <Col sm={12} className="Device-info">
          <Tab.Content>
            <Tab.Pane eventKey="DeviceInformation">
              {devicesIdLoading && <Loader />}
              {deviceInfo && (<ReactTable
                data={deviceInfo}
                columns={[
                  {
                    Header: 'ID',
                    accessor: 'index',
                    width: 50
                  },
                  {
                    Header: 'Device Details',
                    accessor: 'key',
                  },
                  {
                    accessor: 'value',
                    sortable: false,
                  },
                ]}
                defaultPageSize={10}
                showPaginationBottom
                className="-striped -highlight custom-table"
              />)}
            </Tab.Pane>
            <Tab.Pane eventKey="ApplicationsTab">
              {devicesIdLoading && <Loader />}
              {applications && (<ReactTable
                data={applicationsModified()}
                columns={[
                  {
                    Header: 'ID',
                    accessor: 'index',
                    width: 50
                  },
                  {
                    Header: 'Application name',
                    accessor: 'name',
                  },
                  {
                    Header: 'Version',
                    accessor: 'version',
                  },
                  {
                    Header: 'Identifier',
                    accessor: 'applicationIdentifier',
                  },
                ]}
                defaultPageSize={10}
                showPaginationBottom
                className="-striped -highlight custom-table"
              />)}
            </Tab.Pane>
            <Tab.Pane eventKey="OperationsLog" mountOnEnter unmountOnExit >
              <OperationsLog deviceId={deviceId} />
            </Tab.Pane>
            <Tab.Pane eventKey="DeviceStatus" mountOnEnter unmountOnExit >
              <DeviceStatus mdmDeviceStatus={deviceStatus} deviceId={deviceId} />
            </Tab.Pane>
            <Tab.Pane eventKey="Location" mountOnEnter unmountOnExit >
              <LocationLog deviceId={deviceId} />
            </Tab.Pane>
            <Tab.Pane eventKey="AuditLog" mountOnEnter unmountOnExit >
              <AuditLog deviceId={deviceId} />
            </Tab.Pane>
            <Tab.Pane eventKey="DeviceValidity" mountOnEnter unmountOnExit >
              <DeviceValidity deviceId={deviceId} validUntilDate={validUntilDate} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default CustomTable;
