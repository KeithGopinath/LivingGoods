/*eslint-disable*/
import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import Headerbar from '../../components/HeaderBar';
import Sidebar from '../../components/SideBar';
import Card from '../../components/Card';
import Button from '../../components/CustomButton';
import { history } from '../../routes';
import { getUsersEditRequest, getUsersEditPage } from '../../actionCreators/UsersEdit';
import { getUsersNewRequest, getUsersNewPage } from '../../actionCreators/UsersNew';
import { getRolesRequest } from '../../actionCreators/Roles';
import { alertMessage } from '../../utils/containerFunctions';
import { getCountryRequest } from '../../actionCreators/Country';
import { getBranchRequest } from '../../actionCreators/Branch';
import { removeUnderscore } from '../../utils/containerFunctions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
      passwordError: null,
      alertMsg: '',
      roleId: '',
      errorAlert: '',
      countryId: '',
      branchId: '',
      uuid: '',
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    state && this.setState({
      id: state.id,
      firstName: state.firstName,
      lastName: state.lastName,
      mobile: state.mobile === '--' ? '' : state.mobile,
      email: state.email,
      userName: state.username,
      active: state.active,
      password: null,
      confirmPassword: null,
      uuid: state.uuid === '--' ? '' : state.uuid,
      roleId: {
        value: state.roles.id,
        label: state.roles.name
      },
      countryId: {
        value: state.country.id,
        label: state.country.countryName,
      },
      branchId: {
        value: state.branch.id,
        label: state.branch.branchName,
      },
    });
    this.props.getRolesRequest();
    this.props.getCountryRequest();
    this.props.getBranchRequest();
    !state && this.props.getUsersNewPage();
    state && this.props.getUsersEditPage();
  }

  componentDidUpdate(prevProps) {
    const New = this.props.usersNew;
    const Edit = this.props.usersEdit;
    if (New.usersNew && New.usersNew !== prevProps.usersNew.usersNew) {
      this.setState({ alertMsg: New.usersNew.message });
    } else if (New.error && New.error !== prevProps.usersNew.error) {
      this.setState({ alertMsg: New.error.message });
    } else if (Edit.usersEdit && Edit.usersEdit !== prevProps.usersEdit.usersEdit) {
      this.setState({ alertMsg: Edit.usersEdit.message });
    } else if (Edit.error && Edit.error !== prevProps.usersEdit.error) {
      this.setState({ alertMsg: Edit.error.message });
    }
  }

  onSubmitUser = () => {
    const {
      id, firstName, lastName, mobile, password, email, userName, roleId, confirmPassword, countryId, branchId, uuid
    } = this.state;
    const { state } = this.props.location;
    if (firstName === '' || lastName === '' || email === '' || roleId === '' || userName === '' || password === '' ||
      confirmPassword === '' || countryId === '' || branchId === null) {
      this.setState({ alertMsg: 'Please enter all the required details' });
      this.setState({ errorAlert: 'error-alert' });
    } else if (mobile !== "" && mobile.length < 10) {
      this.setState({ alertMsg: 'Please enter a valid mobile number of atleast ten characters' });
      this.setState({ errorAlert: 'error-alert' });
    } else if (/\S+@\S+\.\S+/.test(email) == false) {
      this.setState({ alertMsg: 'Please enter valid email' });
      this.setState({ errorAlert: 'error-alert' });
    } else if (password && password.length < 5) {
      this.setState({ alertMsg: 'You must enter a password of at least five characters' });
      this.setState({ errorAlert: 'error-alert' });
    } else if (password !== confirmPassword) {
      this.setState({ alertMsg: 'Password and confirm password does not match' });
      this.setState({ errorAlert: 'error-alert' });
    } else if (state) {
      const registerUser = {
        id,
        firstName,
        lastName,
        mobile,
        roleId: roleId.value,
        countryId: countryId.value,
        branchId: branchId.value,
        uuid,
      };
      this.setState({ errorAlert: '' });
      this.props.getUsersEditRequest(registerUser);
    } else {
      const registerUser = {
        firstName,
        lastName,
        mobile,
        userName,
        email,
        password,
        roleId: roleId.value,
        countryId: countryId.value,
        branchId: branchId.value,
        uuid,
      };
      this.setState({ errorAlert: '' });
      this.props.getUsersNewRequest(registerUser);
    }
  }

  setFirstname = (e) => {
    if (/^(?![\s-])[\A-Za-z\s-]*$/.test(e.target.value)) {
      this.setState({
        firstName: e.target.value,
      });
    }
  }

  setLastname = (e) => {
    if (/^(?![\s-])[\A-Za-z\s-]*$/.test(e.target.value)) {
      this.setState({
        lastName: e.target.value,
      });
    }
  }

  setMobile = (e) => {
    if (e.target.value.match('^[0-9]*$') != null) {
      this.setState({
        mobile: e.target.value,
      });
    }
  }

  setEmail = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      this.setState({
        email: e.target.value,
      });
    }
  }

  setUserName = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9]*$')) {
      this.setState({
        userName: e.target.value,
      })
    }
  }

  setPassword(e) {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      this.setState({
        password: e.target.value,
      });
      e.target.value.length < 5
        ? this.setState({
          passwordError: (
            <small className="text-danger">
              You must enter a password of at least five characters.
            </small>
          ),
        })
        : this.setState({ passwordError: null });
    }
  }

  setConfirmPassword(e) {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      this.setState({
        confirmPassword: e.target.value,
      });
    }
  }

  setUserRole = (roleId) => {
    this.setState({
      roleId,
    });
  }

  setCountry = (countryId) => {
    this.setState({
      countryId,
    });
    this.setState({ branchId: null })
  }

  setBranch = (branchId) => {
    this.setState({
      branchId,
    });
  }

  setSmartHealth = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9]*$')) {
      this.setState({
        uuid: e.target.value,
      })
    }
  }

  render() {
    const { state } = this.props.location;
    const { roles } = this.props.roles;
    const { login } = this.props.login;
    const { country } = this.props.country;
    const { branch } = this.props.branch;
    const { firstName, lastName, mobile, email, password, confirmPassword, alertMsg, userName, roleId, errorAlert, countryId, branchId, uuid } = this.state;
    const { usersNew } = this.props;
    const { usersEdit } = this.props;
    const headerName = state ? 'Edit User' : 'New User';
    const cardName = state ? 'Fill in the form below to edit user' : 'Fill in the form below to create a new user';
    // For new and edit flag for styling
    const userPage = state ? usersEdit.usersEdit : usersNew.usersNew;
    const alert = userPage && userPage.message ? 'forgot-password-success' : 'forgot-password-error';
    const alertClassName = errorAlert ? 'forgot-password-error' : alert;
    // To select role 
    const roleName = login ? login.roleName : sessionStorage.rolename
    const roleOptions = roleName == 'SUPER_ADMIN' ?
      roles && roles.map((data) => ({
        value: data.id,
        label: `${data.name}`,
      }))
      :
      roles && roles.filter(rol => rol.name == 'ADMIN').map((data) => ({
        value: data.id,
        label: `${data.name}`,
      }))

    const modifiedRoleOptions = removeUnderscore(roleOptions)
    // country options
    const countryOptions = country && country.map((data) => ({
      value: data.id,
      label: `${data.countryName}`,
    }))
    // branch options
    const branchOptions = branch && branch.filter(val => val.country.id == countryId.value).map((data) => ({
      value: data.id,
      label: `${data.branchName}`,
    }))
    // select field custom style
    const customStyles = {
      control: (base) => ({
        ...base,
        '&:hover': { borderColor: 'gray' }, // border style on hover
        border: '1px solid #e3e3e3', // default border color
        boxShadow: 'none', // no box-shadow
      }),
    }

    const userAlert = alertMsg && alertMessage(alertMsg).join("\r\n")

    return (
      <div className="wrapper">
        <Sidebar history={history} />
        <div className="main-panel">
          <Headerbar headerName={headerName} />
          <div className="main-content">
            <Grid fluid>
              <Card
                category={cardName}
                content={
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>
                          First Name: <span className="star">*</span>
                        </ControlLabel>
                        <FormControl
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => this.setFirstname(e)}
                          className={firstName === '' && errorAlert}
                          maxLength={30}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>
                          Last Name: <span className="star">*</span>
                        </ControlLabel>
                        <FormControl
                          type="text"
                          name="lastName"
                          value={lastName}
                          className={lastName === '' && errorAlert}
                          onChange={(e) => this.setLastname(e)}
                          maxLength={30}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>
                          Mobile:
                        </ControlLabel>
                        <FormControl
                          type="text"
                          name="mobile"
                          value={mobile}
                          onChange={(e) => this.setMobile(e)}
                          autoComplete="off"
                          maxLength={15}
                          placeholder="Mobile number should be minimum of ten characters"
                          className={(mobile.length < 10 && mobile != "") && errorAlert}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>
                          Email: <span className="star">*</span>
                        </ControlLabel>
                        <FormControl
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => this.setEmail(e)}
                          autoComplete="off"
                          className={email === '' && errorAlert}
                          maxLength={50}
                          disabled={state}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>
                          Username: <span className="star">*</span>
                        </ControlLabel>
                        <FormControl
                          type="text"
                          name="userName"
                          value={userName}
                          onChange={(e) => this.setUserName(e)}
                          autoComplete="off"
                          className={userName === '' && errorAlert}
                          maxLength={30}
                          disabled={state}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>
                          User Role: <span className="star">*</span>
                        </ControlLabel>
                        <Select
                          name="userRole"
                          value={removeUnderscore([roleId])}
                          onChange={this.setUserRole}
                          options={modifiedRoleOptions}
                          isSearchable={false}
                          className={roleId === '' && errorAlert}
                          maxLength={30}
                          isDisabled={roleName == "ADMIN" && state ? true : false}
                          styles={customStyles}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6} style={{ clear: 'both' }}>
                      <FormGroup>
                        <ControlLabel>
                          Smart Health UUID:
                        </ControlLabel>
                        <FormControl
                          type="text"
                          name="SmartHealthUUID"
                          value={uuid}
                          onChange={(e) => this.setSmartHealth(e)}
                          maxLength={8}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6} style={{ clear: 'both' }}>
                      <FormGroup>
                        <ControlLabel>
                          Country: <span className="star">*</span>
                        </ControlLabel>
                        <Select
                          name="country"
                          value={countryId}
                          onChange={this.setCountry}
                          options={countryOptions}
                          isSearchable
                          className={countryId === '' && errorAlert}
                          maxLength={30}
                          styles={customStyles}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <ControlLabel>
                          Branch: <span className="star">*</span>
                        </ControlLabel>
                        <Select
                          name="branch"
                          value={branchId}
                          onChange={this.setBranch}
                          options={branchOptions}
                          isSearchable
                          className={branchId === null && errorAlert}
                          maxLength={30}
                          isDisabled={countryId.value ? false : true}
                          styles={customStyles}
                        />
                      </FormGroup>
                    </Col>
                    {!state &&
                      <div>
                        <Col md={6} style={{ clear: 'both' }}>
                          <FormGroup>
                            <ControlLabel>
                              Password: <span className="star">*</span>
                            </ControlLabel>
                            <FormControl
                              type="password"
                              name="password"
                              value={password}
                              autoComplete="off"
                              onChange={(e) => this.setPassword(e)}
                              className={password.length < 5 && errorAlert}
                              maxLength={15}
                            />
                            {this.state.passwordError}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <ControlLabel>
                              Confirm password: <span className="star">*</span>
                            </ControlLabel>
                            <FormControl
                              type="password"
                              name="confirmPassword"
                              value={confirmPassword}
                              autoComplete="off"
                              onChange={(e) => this.setConfirmPassword(e)}
                              className={(confirmPassword !== password || confirmPassword == "") && errorAlert}
                              maxLength={15}
                            />
                          </FormGroup>
                        </Col>
                      </div>}
                    <Col md={6}>
                      <div className="category">
                        <span className="star">*</span> Required fields
                    </div>
                    </Col>
                    <Col md={12}><p className={alertClassName}>{userAlert}</p></Col>
                    <Col md={12} className="mt-4">
                      <Button
                        variant="primary"
                        fill
                        pullLeft
                        onClick={(event) => this.onSubmitUser(event)}
                      >
                        {state ? 'Update user' : 'Add user'}
                      </Button>
                    </Col>
                  </Row>
                }
              />
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usersEdit: state.usersEditState,
  usersNew: state.usersNewState,
  roles: state.rolesState,
  login: state.loginState,
  country: state.countryState,
  branch: state.branchState,
});

const mapDispatchToProps = (dispatch) => ({
  getUsersEditRequest: (registerUser) => dispatch(getUsersEditRequest(registerUser)),
  getUsersNewRequest: (registerUser) => dispatch(getUsersNewRequest(registerUser)),
  getRolesRequest: () => dispatch(getRolesRequest()),
  getCountryRequest: () => dispatch(getCountryRequest()),
  getBranchRequest: () => dispatch(getBranchRequest()),
  getUsersEditPage: () => dispatch(getUsersEditPage()),
  getUsersNewPage: () => dispatch(getUsersNewPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
