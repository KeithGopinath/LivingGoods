/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBTypography } from 'mdbreact';
import { Grid, Col, Row, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faPhoneSlash, faPaperPlane, faLock, faInfoCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Headerbar from '../../components/HeaderBar';
import Sidebar from '../../components/SideBar';
import { history } from '../../routes';
import Card from '../../components/Card';
import { getRingDeviceRequest, getMuteDeviceRequest, getLockDeviceRequest, getSendMessageRequest, getSyncInfoRequest } from '../../actionCreators/DevicesActions';
import CustomTable from '../../components/CustomTable';
import PopUp from '../../components/PopUp';
import { enforceNull } from '../../utils/containerFunctions';
import { getDevicesIdRequest } from '../../actionCreators/DevicesId';
import { Battery } from '@pxblue/react-progress-icons';

const ViewDeviceTabs = [
  {
    eventKey: 'DeviceInformation',
    className: 'fa fa-user',
    tabHeader: 'Device Info',
  },
  {
    eventKey: 'OperationsLog',
    className: 'fa fa-info',
    tabHeader: 'Operations Log',
  },
  {
    eventKey: 'ApplicationsTab',
    className: 'fa fa-wrench',
    tabHeader: 'Applications',
  },
  {
    eventKey: 'Location',
    className: 'fa fa-map-marker',
    tabHeader: 'Location',
  },
  {
    eventKey: 'AuditLog',
    className: 'fa fa-user',
    tabHeader: 'Audit Log',
  },
  {
    eventKey: 'DeviceStatus',
    className: 'fa fa-info',
    tabHeader: 'Device Status',
  },
  {
    eventKey: 'DeviceValidity',
    className: 'fa fa-calendar',
    tabHeader: 'Device Validity',
  },
];

class DeviceView extends Component {
  state = {
    popup: false,
    status: false,
    title: "",
    button: "",
    icon: "",
    labelOne: "",
    labelTwo: "",
  }

  componentDidMount() {
    const deviceId = {
      id: this.props.location.state.id
    }
    this.props.getDevicesIdRequest(deviceId)
  }

  ringDevice = (id) => {
    const deviceId = {
      id: id
    }
    this.props.getRingDeviceRequest(deviceId)
  }

  muteDevice = (id) => {
    const deviceId = {
      id: id
    }
    this.props.getMuteDeviceRequest(deviceId)
  }

  lockDevice = (id) => {
    const deviceId = {
      id: id
    }
    this.props.getLockDeviceRequest(deviceId)
  }

  sendMessage = (inputOne, inputTwo) => {
    const payload = {
      id: this.props.location.state.id,
      messageTitle: inputOne,
      messageText: inputTwo,
    }
    this.props.getSendMessageRequest(payload)
  }

  synchInfo = (id) => {
    const deviceId = {
      id: id
    }
    this.props.getSyncInfoRequest(deviceId)
  }

  popHandler = (inputOne, inputTwo) => {
    if (this.state.labelOne.includes('Title')) {
      this.sendMessage(inputOne, inputTwo)
    }
  }

  sendMessagePopUp = () => {
    this.setState({ title: "Send Message", button: "Send", popup: true, icon: faEnvelope, labelOne: "Title", labelTwo: "Message" });
  }

  hidePopup = () => {
    this.setState({ popup: false });
  }

  render() {
    const { popup, title, button, icon, status, labelOne, labelTwo } = this.state;
    const { devicesId, devicesIdLoading } = this.props.devicesId;
    const { login } = this.props.login;
    const { deviceInfo, applicationList, active } = devicesId;
    const { mdmDeviceStatus, id } = enforceNull(this.props.location.state);
    const info = this.props.location.state.deviceInfo;
    const deviceId = this.props.location.state.id;

    // condition for checking disabled actions
    const superAdminFlag = login ? login.roleName : sessionStorage.rolename;
    const ActionDisable = active && superAdminFlag == 'SUPER_ADMIN' ? true : false;

    // condition for location alert message
    const latitude = deviceInfo && deviceInfo.Latitude;
    const locationAlert = latitude === "Can not fetch" ? "Latitude and Longitude are not available right now" : null;

    return (
      <div className="wrapper">
        <PopUp showPopup={popup} hidePopup={this.hidePopup} popHandler={this.popHandler} title={title} button={button} icon={icon} status={status}
          labelOne={labelOne} labelTwo={labelTwo} />
        <Sidebar history={history} />
        <div className="main-panel">
          <Headerbar headerName="View Device" alertMessage={deviceInfo && locationAlert} />
          <div className="main-content">
            <Grid fluid>
              <Row>
                <Card
                  content={
                    <Grid fluid>
                      <Row>
                        {info ? <Col lg={4} sm={5}>
                          <div className='deviceCard'>
                            <Row className='mb-3'>
                              <Col lg={3} sm={5}>
                                <i className="icon fa fa-android fa-5x" style={{
                                  marginTop: 30,
                                  marginLeft: 20,
                                }}></i>
                              </Col>
                              <Col lg={9} sm={7} className="device-details">
                                <h3><strong>{deviceInfo && deviceInfo.Device_Model}</strong></h3>
                                <h5><strong>{deviceInfo && deviceInfo.Device_Name}</strong></h5>
                                <h5><strong>{deviceInfo && deviceInfo.Network_Operator}</strong></h5>
                                <h5><strong>{deviceInfo && deviceInfo.Phone_Number}</strong></h5>
                              </Col>
                            </Row>
                            <Row className='mb-3'>
                              <Table className="icons">
                                <tbody>
                                  <tr>
                                    <td><Battery percent={deviceInfo && deviceInfo.Battery_Level} size={30} color={'white'} showPercentLabel
                                      labelPosition={'right'} labelColor={'white'} labelSize={'15px'} outlined /></td>
                                    <td><i className="icon fa fa-database fa" title="OS Version"></i>
                                      <span>{deviceInfo && deviceInfo.Os_Version}</span></td>
                                    <td><i className="icon fa fa-usb fa" title="Available RAM Memory"></i>
                                      <span>{deviceInfo && deviceInfo.Available_RAM_Memory}</span></td>
                                    <td><i className="icon fa fa-microchip fa" title="Total RAM Memory"></i>
                                      <span>{deviceInfo && deviceInfo.Total_RAM_Memory}</span></td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Row>
                            <Row>
                              <Table className='actions-table'>
                                <thead>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <Button className="action-button" simple onClick={() => this.ringDevice(id)} disabled={ActionDisable ? false : true}>
                                        <FontAwesomeIcon icon={faPhoneVolume} size="lg" className={ActionDisable ? "action-icon" : "disabled-icon"} />
                                        <p className='action-label'>Ring</p>
                                      </Button>
                                    </td>
                                    <td>
                                      <Button className="action-button" simple onClick={() => this.muteDevice(id)} disabled={ActionDisable ? false : true}>
                                        <FontAwesomeIcon icon={faPhoneSlash} size="lg" className={ActionDisable ? "action-icon" : "disabled-icon"} />
                                        <p className='action-label'>Mute</p>
                                      </Button>
                                    </td>
                                    <td>
                                      <Button className="action-button" simple onClick={this.sendMessagePopUp} disabled={ActionDisable ? false : true}>
                                        <FontAwesomeIcon icon={faPaperPlane} size="lg" className={ActionDisable ? "action-icon" : "disabled-icon"} />
                                        <p className='action-label'>Message</p>
                                      </Button>
                                    </td>
                                    <td>
                                      <Button className="action-button" simple onClick={() => this.lockDevice(id)} disabled={ActionDisable ? false : true}>
                                        <FontAwesomeIcon icon={faLock} size="lg" className={ActionDisable ? "action-icon" : "disabled-icon"} />
                                        <p className='action-label'>Lock</p>
                                      </Button>
                                    </td>
                                    <td>
                                      <Button className="action-button" simple onClick={() => this.synchInfo(id)} disabled={ActionDisable ? false : true}>
                                        <FontAwesomeIcon icon={faInfoCircle} size="lg" className={ActionDisable ? "action-icon" : "disabled-icon"} />
                                        <p className='action-label'>Sync</p>
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Row>
                          </div>
                        </Col> : <Col sm={6} smOffset={3}>
                          <div style={{ textAlign: 'center' }}>
                            <i className="icon fa fa-info fa-5x" style={{
                              color: '#ccc',
                              marginTop: '100px'
                            }}></i>
                            <MDBTypography tag='h3'>
                              <strong className='iblock'>Yet to fetch device information</strong><br />
                              <small className="text-muted iblock mb-3">Please make sure this device {deviceInfo && deviceInfo.deviceName} is registered in WSO2</small> <br />
                            </MDBTypography>
                            <div className='justify-content-center'>
                              <Button block variant='primary' className='btn-fill emptyBack' onClick={() => window.history.back()}>
                                <span>Back to Devices</span>
                              </Button>
                            </div>
                          </div>
                        </Col>}
                        <Col lg={8} sm={7}>
                          <Row className="settings-page">
                            <Col md={12} className="settings-link-enc">
                              {info && <CustomTable deviceId={deviceId} deviceStatus={mdmDeviceStatus} applicationList={applicationList}
                                info={deviceInfo} ViewDeviceTabs={ViewDeviceTabs} devicesIdLoading={devicesIdLoading} />}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Grid>
                  } />
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  devicesId: state.deviceIdState,
  login: state.loginState,
});

const mapDispatchToProps = (dispatch) => ({
  getRingDeviceRequest: (deviceId) => dispatch(getRingDeviceRequest(deviceId)),
  getMuteDeviceRequest: (deviceId) => dispatch(getMuteDeviceRequest(deviceId)),
  getLockDeviceRequest: (deviceId) => dispatch(getLockDeviceRequest(deviceId)),
  getSendMessageRequest: (payload) => dispatch(getSendMessageRequest(payload)),
  getSyncInfoRequest: (deviceId) => dispatch(getSyncInfoRequest(deviceId)),
  getDevicesIdRequest: (deviceId) => dispatch(getDevicesIdRequest(deviceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceView);