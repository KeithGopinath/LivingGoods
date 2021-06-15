/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Select from "react-select";
import Button from '../../components/CustomButton';
import { removeUnderscore, enforceUnderscore } from '../../utils/containerFunctions';

const DeviceStatus = ({ mdmDeviceStatus, deviceId }) => {
  const [status, setStatus] = useState({ value: mdmDeviceStatus, label: mdmDeviceStatus });
  const [alertMsg, setAlertMsg] = useState("");
  const [flag, setFlag] = useState(false);
  const deviceStatus = useSelector((state) => state.deviceStatusState.deviceStatus);
  const deviceStatusEdit = useSelector((state) => state.deviceStatusEditState.deviceStatusEdit);
  const deviceStatusEditError = useSelector((state) => state.deviceStatusEditState.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "DEVICE_STATUS_REQUEST" })
  }, []);

  useEffect(() => {
    if (deviceStatusEdit && flag) {
      setAlertMsg(deviceStatusEdit.message);
    }
    else if (deviceStatusEditError && flag) {
      setAlertMsg(deviceStatusEditError.message);
    }
  }, [deviceStatusEdit, deviceStatusEditError]);

  const ChangeStatus = (val) => {
    setStatus(val);
    setAlertMsg('');
  };

  const Handler = () => {
    const modifiedStatus = enforceUnderscore([status])
    const Payload = {
      mdmDeviceStatus: modifiedStatus[0].value,
      deviceId: deviceId
    }
    dispatch({ type: "DEVICE_STATUS_EDIT_REQUEST", payload: Payload })
    setFlag(true)
  }

  const deviceOptions = deviceStatus && deviceStatus.filter(val => val !== 'EXPIRED' && val !== 'IN_ACTIVE').map(data => {
    return {
      value: data,
      label: data,
    }
  })

  const modifiedDeviceOptions = removeUnderscore(deviceOptions);

  // condition for alert class name success and failure
  const alertClassName = deviceStatusEdit && deviceStatusEdit.status == "OK" ? 'alertsuccess' : 'alertfalse';

  return (
    <div>
      <Row className="device-status-container">
        <Col md={6}>
          <Select
            className="device-status-select"
            value={removeUnderscore([status])}
            onChange={ChangeStatus}
            options={modifiedDeviceOptions}
            isSearchable={false}
          />
        </Col>
        <Col md={6} className="device-status-button">
          <Button variant="primary" fill onClick={Handler}>Update</Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="update">
            <span className={alertClassName}>{alertMsg}</span>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default (DeviceStatus);


