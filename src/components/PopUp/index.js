/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, FormControl, FormGroup, ControlLabel, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../CustomButton';
import { alertMessage } from '../../utils/containerFunctions';

const PopUp = ({
  button, title, showPopup, status, icon, hidePopup, popHandler, labelOne, labelTwo,
}) => {
  const [show, setShow] = useState(showPopup);
  const [alertMsg, setAlertMsg] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [file, setFile] = useState('');

  const usersImport = useSelector((state) => state.usersImportState.usersImport);
  const usersImportError = useSelector((state) => state.usersImportState.error);
  const buildVersion = useSelector((state) => state.buildVersionState.buildVersion);
  const buildVersionError = useSelector((state) => state.buildVersionState.error);
  const dispatch = useDispatch();

  useEffect(() => {
    setShow(showPopup);
    setAlertMsg('');
  }, [showPopup]);

  // import user
  useEffect(() => {
    if (usersImport) {
      dispatch({ type: 'USERS_REQUEST' });
      setAlertMsg(`${usersImport.message}`);
      ClearState();
    } else if (usersImportError) {
      setAlertMsg(`${usersImportError.message}`);
    }
  }, [usersImport, usersImportError]);

  // Build version
  useEffect(() => {
    if (buildVersion) {
      setAlertMsg(buildVersion.message);
      ClearState();
    } else if (buildVersionError) {
      setAlertMsg(buildVersionError.message);
    }
  }, [buildVersion, buildVersionError]);

  // InputOne Validations based on different page
  const InputOneHandler = (e) => {
    if (title.includes('Message') || title.includes('Build')) {
      // Send message or Build version
      if (/^(?![\s-])[A-Za-z0-9_@./#&+-\s-]*$/.test(e.target.value)) {
        setInputOne(e.target.value);
      }
    } else {
      setInputOne(e.target.value);
    }
  };

  // InputTwo Validations based on different page
  const InputTwoHandler = (e) => {
    if (title.includes('Message') || title.includes('Build')) {
      // Send message or Build version
      if (/^(?![\s-])[A-Za-z0-9_@./#&+-\s-]*$/.test(e.target.value)) {
        setInputTwo(e.target.value);
      }
    } else {
      setInputTwo(e.target.value);
    }
  };

  const FileHandler = (e) => {
    setFile(e.target.files);
  };

  const ClearState = () => {
    setTimeout(() => {
      hidePopup();
      setAlertMsg('');
      setErrorAlert('');
      setInputOne('');
      setInputTwo('');
      setFile('');
    }, 3000);
  };

  // PopUp Validations based on different page
  const ButtonHandler = () => {
    // send message
    if (title.includes('Message')) {
      if (inputOne === '' || inputTwo === '') {
        setAlertMsg('Please enter all the required details');
        setErrorAlert('error-alert');
      } else {
        popHandler(inputOne, inputTwo);
        setAlertMsg('Message Send Successfully');
        setErrorAlert('');
        ClearState();
      }
      // Build version
    } else if (title.includes('Build')) {
      if (inputOne == '' || inputTwo === '') {
        setAlertMsg('Please enter all the required details');
        setErrorAlert('error-alert');
      } else {
        const payload = {
          apkUrl: inputTwo,
          apkVersion: inputOne
        }
        dispatch({ type: 'BUILD_VERSION_REQUEST', payload });
        setErrorAlert('');
      }
    } else if (title.includes('Users')) {
      // import users
      const formData = new FormData();
      formData.append('file', file[0]);
      if (file) {
        dispatch({ type: 'USERS_IMPORT_REQUEST', formData });
      } else {
        setAlertMsg('Please choose the file to import');
      }
    } else {
      ClearState();
    }
  };

  const CloseButton = () => {
    hidePopup();
    setAlertMsg('');
    setErrorAlert('');
    setInputOne('');
    setInputTwo('');
    setFile('');
  };

  // Alert class name for different cases of success and failure
  const userImportAlert = usersImport && usersImport.status == "OK" ? 'alertsuccess' : 'alertfalse';
  const buildVersionAlert = buildVersion && buildVersion.status == "OK" ? 'alertsuccess' : 'alertfalse';
  const sendMessageAlert = alertMsg.includes('Successfully') ? 'alertsuccess' : 'alertfalse';
  const alertClass = errorAlert ? 'alertfalse' : title.includes('Users') ? userImportAlert : title.includes('Build') ? buildVersionAlert : sendMessageAlert;
  const popUpAlert = alertMsg && alertMessage(alertMsg).join('\r\n');

  return (
    <div>
      <Modal show={show} onHide={hidePopup} backdrop="static" keyboard={false}>
        <Modal.Header className="pop-header">
          <Modal.Title className="modaltitle">
            <FontAwesomeIcon icon={icon} size="md" />
            <span className="ml-2">{title}</span>
            <Button onClick={CloseButton}><FontAwesomeIcon icon={faTimesCircle} className="pop-close" /></Button>
          </Modal.Title>
        </Modal.Header>
        {status ?
          <Modal.Body>
            <FormGroup>
              <Col md={10}>
                <FormControl
                  type="file"
                  onChange={FileHandler}
                />
              </Col>
            </FormGroup>
          </Modal.Body>
          :
          <Modal.Body>
            <FormGroup>
              <Row className="mb-3">
                <Col md={2}>
                  <ControlLabel className="col-md-1">{labelOne}</ControlLabel>
                </Col>
                <Col md={10}>
                  <FormControl
                    type="text"
                    onChange={InputOneHandler}
                    className={inputOne == '' && errorAlert}
                    value={inputOne}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row className="mb-3">
                <Col md={2}>
                  <ControlLabel className="col-md-1">{labelTwo}</ControlLabel>
                </Col>
                <Col md={10}>
                  <FormControl
                    type="text"
                    onChange={InputTwoHandler}
                    className={inputTwo == '' && errorAlert}
                    value={inputTwo}
                  />
                </Col>
              </Row>
            </FormGroup>
          </Modal.Body>
        }
        <Modal.Footer className="pop-footer">
          <p className={alertClass}>{popUpAlert}</p>
          <Button
            className="popup-button mb-5"
            onClick={ButtonHandler}
          >{button}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PopUp;
