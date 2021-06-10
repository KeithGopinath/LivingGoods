/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { history } from '../../routes';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import livinggoods from '../../../public/static/images/lg_logo_white.png';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [alert, setAlert] = useState('');
  const [errorAlert, seterrorAlert] = useState('');
  const dispatch = useDispatch();
  const validLogin = useSelector((state) => state.loginState.login);
  const inValidLogin = useSelector((state) => state.loginState.error);
  const loading = useSelector((state) => state.loginState.isLoading);

  useEffect(() => {
    setAlert(inValidLogin && inValidLogin.message);
  }, [inValidLogin]);

  useEffect(() => {
    setAlert('');
  }, []);

  if (validLogin && login) {
    const { from } = props.location.state || { from: { pathname: '/dashboard' } }
    return <Redirect to={from} />
  } else if (validLogin && !login) {
    sessionStorage.clear();
    dispatch({ type: 'LOGOUT_SUCCESS' });
  }

  const onLogin = () => {
    if (username === '' && password === '') {
      setAlert('Please enter the valid credentials');
      seterrorAlert('error-alert');
    } else if (password === '') {
      setAlert('Please enter the valid password');
      seterrorAlert('error-alert');
    } else if (username === '') {
      setAlert('Please enter the valid username');
      seterrorAlert('error-alert');
    } else {
      setLogin(true);
      const loginDetails = {
        username,
        password,
      };
      dispatch({ type: 'LOGIN_REQUEST', login: loginDetails });
    }
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    dispatch({ type: 'FORGOT_PASSWORD_REDIRECT' });
    history.push({
      pathname: '/forgot-password',
    });
  };

  const userNamehandler = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9]*$')) {
      setUsername(e.target.value)
    }
  }

  const passwordHandler = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setPassword(e.target.value)
    }
  }

  return (
    <div className="wrapper wrapper-full-page">
      {loading && <Loader />}
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
                    <img src={livinggoods} className="mb-5" style={{ width: '100%', maxWidth: '230px', marginBottom: '20px' }} />
                  </div>
                  <Card
                    hidden={false}
                    textCenter
                    title="Login"
                    content={
                      <div>
                        <FormGroup>
                          <ControlLabel>Username</ControlLabel>
                          <FormControl className={username === '' && errorAlert} placeholder="Enter Username" type="text"
                            onChange={userNamehandler} maxLength={30} value={username} />
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Password</ControlLabel>
                          <FormControl className={password === '' && errorAlert} placeholder="Password" type="password"
                            onChange={passwordHandler} autoComplete="off" maxLength={15} value={password} />
                        </FormGroup>
                        <div className="forgot-password-container">
                          <span onClick={forgotPassword} className="forgot-password">Forgot Password?</span>
                        </div>
                        <p className="forgot-password-error">{alert}</p>
                      </div>
                    }
                    legend={
                      <Button block variant="primary" className="btn-fill" onClick={onLogin}>
                        Login
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

export default Login;

