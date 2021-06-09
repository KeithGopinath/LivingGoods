/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { history } from '../../routes';
import Card from '../../components/Card';
import livinggoods from '../../../public/static/images/lg_logo_white.png'

const redirectToLogin = (e) => {
  e.preventDefault();
  history.push({
    pathname: '/',
  });
};

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)
  const [confirmpasswordError, setConfirmPasswordError] = useState(null)
  const [alertMsg, setAlertMsg] = useState('');
  const [errorAlert, seterrorAlert] = useState('');

  const dispatch = useDispatch()
  const InvalidReset = useSelector(state => state.resetPasswordState);

  useEffect(() => {
    if(InvalidReset.resetPassDetails){
    setAlertMsg(InvalidReset.resetPassDetails.message);
    }
    else if(InvalidReset.error){
      setAlertMsg(InvalidReset.error.message);
    }
  }, [InvalidReset]);

  let url = new URL(window.location.href)

  const PasswordValidator = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setPassword(e.target.value)
      e.target.value.length < 5 ?
        setPasswordError(
          <small className="text-danger">
            You must enter a password of at least five characters
            </small>)
        :
        setPasswordError(null)
    }
  }

  const ConfirmPasswordValidator = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setConfirmPassword(e.target.value)
      e.target.value.length < 5 ?
        setConfirmPasswordError(
          <small className="text-danger">
            Confirm password should match with password
            </small>)
        :
        setConfirmPasswordError(null)
    }
  }

  const onPasswordSubmit = () => {
    if (password === '' || confirmPassword === '') {
      setAlertMsg('Please fill the required fields');
      seterrorAlert('error-alert');
    } else if (password !== confirmPassword) {
      setAlertMsg("Password and confirm password does not match")
      seterrorAlert('error-alert');
    }
    else if (password.length < 5 || confirmPassword.length < 5) {
      seterrorAlert('error-alert');
    }
    else {
      const resetPassDetails = {
        password: password,
        confirmPassword: confirmPassword,
        token: url.searchParams.get('token')
      }
      dispatch({ type: 'RESET_PASSWORD_REQUEST', resetPassDetails: resetPassDetails })
    }
  };

  // Condition for Success and Error ClassName
  const alertClassName = InvalidReset.resetPassDetails && InvalidReset.resetPassDetails.status === 'OK' ? 'reset-password-success' : 'reset-password-error';

  return (
    <div className="wrapper wrapper-full-page">
      <div
        className="full-page login-page"
        data-color="black"
      >
        <div className="content">
          <div className="container">
            <Row>
              <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                <form>
                  <div className='text-center'>
                    <img src={livinggoods} className='mb-5' style={{ 'width': '100%', 'maxWidth': '230px', 'marginBottom': '20px' }} />
                  </div>
                  <Card
                    hidden={false}
                    textCenter
                    title="Reset Password"
                    content={
                      <div>
                        <FormGroup>
                          <ControlLabel>Password</ControlLabel>
                          <FormControl placeholder="Password" type="password" onChange={PasswordValidator}
                            value={password} className={password.length < 5 && errorAlert} maxLength={15} />
                          {passwordError}
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Confirm password</ControlLabel>
                          <FormControl placeholder="Confirm password" type="password" onChange={ConfirmPasswordValidator}
                            value={confirmPassword} className={confirmPassword.length < 5 && errorAlert} maxLength={15} />
                          {confirmpasswordError}
                        </FormGroup>
                        <p className={alertClassName}>{alertMsg}</p>
                      </div>
                    }
                    legend={
                      <div>
                        <Button block variant='primary' className='btn-fill mb-4' onClick={onPasswordSubmit}>
                          Reset password
                      </Button>
                        <Button block wd onClick={redirectToLogin}>Back to login</Button>
                      </div>
                    }
                    ftTextCenter
                  />
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
