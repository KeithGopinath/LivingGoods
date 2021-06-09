/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, ControlLabel, Col } from 'react-bootstrap';
import Select from "react-select";
import Button from '../../components/CustomButton';
import { removeUnderscore } from '../../utils/containerFunctions';

const DeviceStatus = ({ mdmDeviceStatus, deviceId }) => {
  const [status, setStatus] = useState({ value: mdmDeviceStatus, label: mdmDeviceStatus });
  const [alertMsg, setAlertMsg] = useState("");
  const deviceStatus = useSelector((state) => state.deviceStatusState.deviceStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "DEVICE_STATUS_REQUEST" })
  }, []);

  const ChangeStatus = (val) => {
    setStatus(val);
    setAlertMsg('');
  };

  const Handler = () => {
    const Payload = {
      mdmDeviceStatus: status.value,
      deviceId: deviceId
    }
    dispatch({ type: "DEVICE_STATUS_EDIT_REQUEST", payload: Payload })
    setAlertMsg("Status changed successfully")
  }

  const deviceOptions = deviceStatus && deviceStatus.map(data => {
    return {
      value: data,
      label: data,
    }
  }
  )

  const modifiedDeviceOptions = removeUnderscore(deviceOptions);

  return (
    <div>
      <FormGroup>
        <ControlLabel className="status">
          Status
         </ControlLabel>
        <Select
          className="basic-single"
          classNamePrefix="select"
          value={status}
          onChange={ChangeStatus}
          options={modifiedDeviceOptions}
          isSearchable={false}
        />
      </FormGroup>
      <div className="update">
        <span className="statusalert">{alertMsg}</span>
      </div>
      <Col md={12} className="mt-4 update">
        <Button
          variant="primary"
          fill
          pullLeft
          onClick={Handler}
        >Update
        </Button>
      </Col>
    </div>
  )
}

export default (DeviceStatus);


