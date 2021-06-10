/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Button from '../../components/CustomButton';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const DeviceValidity = ({ deviceId }) => {
  const [alertMsg, setAlertMsg] = useState('');
  const [newDate, setNewDate] = useState('');

  const dispatch = useDispatch();
  const deviceValidity = useSelector((state) => state.deviceValidityState.deviceValidity);
  const deviceValidityError = useSelector((state) => state.deviceValidityState.error);

  useEffect(() => {
    if (deviceValidity) {
      setAlertMsg(deviceValidity.message);
    }
    else if (deviceValidityError) {
      setAlertMsg(deviceValidityError.message);
    }
  }, [deviceValidity, deviceValidityError]);

  const yourDate = new Date();
  const date = moment(yourDate, 'YYYY-MM-DD').format();

  const disabledDate = (current) => {
    const customDate = date;
    return current && current < moment(customDate, 'YYYY-MM-DD');
  }

  const onDateChange = (date, dateString) => {
    setNewDate(dateString)
  }

  const onSubmitDate = () => {
    const payload = {
      validUntilDate: newDate,
      deviceId
    }
    dispatch({ type: "DEVICE_VALIDITY_REQUEST", payload })
  }

  // condition for alert class name success and failure
  const alertClassName = deviceValidity && deviceValidity.status == "OK" ? 'alertsuccess' : 'alertfalse';

  return (
    <div >
      <Row className="device-status-container">
        <Col md={6}>
          <DatePicker
            className="date-picker"
            size="large"
            format="DD-MM-YYYY"
            disabledDate={disabledDate}
            onChange={onDateChange}
          />
        </Col>
        <Col md={6} className="device-status-button" >
          <Button onClick={onSubmitDate} variant="primary" fill >Update</Button>
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

export default (DeviceValidity);


