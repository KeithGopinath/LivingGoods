/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Card from '../../components/Card';
import livinggoods from '../../../public/static/images/lg_logo_white.png';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');
  const [errorAlert, seterrorAlert] = useState('');
  const dispatch = useDispatch();
  const emailSent = useSelector((state) => state.forgotPasswordState.forgotPassDetails);

  useEffect(() => {
    setAlert(emailSent && emailSent.message);
    if (emailSent && emailSent.status === 'OK') {
      setTimeout(() => {
        history.push({
          pathname: '/',
        });
      }, 3000);
    }
  }, [emailSent]);

  useEffect(() => {
    setAlert('');
  }, []);

  // Condition for Email Validation
  const validateEmail = (emailmsg) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(emailmsg);
  };

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    setAlert('');
    const valid = validateEmail(email);
    if (valid === false) {
      setAlert('Please enter valid email');
      seterrorAlert('error-alert');
    } else {
      const forgotPassDetails = {
        email,
      };
      dispatch({ type: 'FORGOT_PASSWORD_REQUEST', forgotPassDetails });
      seterrorAlert('');
    }
  };

  const emailHandler = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setEmail(e.target.value);
    }
  };

  // Condition for Success and Error ClassName
  const alertCheck = emailSent && emailSent.status === 'OK' ? 'forgot-password-success' : 'forgot-password-error';
  const alertClassName = errorAlert ? 'forgot-password-error' : alertCheck;
  const errorAlertCheck = ((!email || !validateEmail(email)) && errorAlert) || (emailSent && emailSent.status !== 'OK' ? 'error-alert' : '')
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
                  <div className="text-center">
                    <img alt="LG Logo" src={livinggoods} className="mb-5" style={{ width: '100%', maxWidth: '230px', marginBottom: '20px' }} />
                  </div>
                  <Card
                    hidden={false}
                    textCenter
                    title="Forgot Password"
                    content={
                      <div>
                        <FormGroup>
                          <ControlLabel>Email address</ControlLabel>
                          <FormControl
                            className={errorAlertCheck}
                            placeholder="Enter email"
                            type="text"
                            onChange={emailHandler}
                            maxLength={50}
                            value={email}
                          />
                        </FormGroup>
                        <p className={alertClassName}>{alert}</p>
                      </div>
                    }
                    legend={
                      <Button block variant="primary" className="btn-fill" onClick={forgotPasswordHandler}>
                        Send password reset email
                      </Button>
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
};

export default ForgotPassword;
