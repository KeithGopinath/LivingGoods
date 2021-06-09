/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import Button from '../../components/CustomButton';
import { profileEditRequest } from '../../actionCreators/ProfileEdit';
import Select from 'react-select';

const Profile = ({ data }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [userName, setUserName] = useState('');
  const [roleId, setRoleId] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [countryId, setCountryId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [uuid, setUuid] = useState('');

  const dispatch = useDispatch();

  const country = useSelector((state) => state.countryState.country);
  const branch = useSelector((state) => state.branchState.branch);
  const roles = useSelector((state) => state.rolesState.roles);
  const login = useSelector((state) => state.loginState.login);
  const roleName = login ? login.roleName : sessionStorage.rolename;
  const ProfileEdit = useSelector((state) => state.profileEditState.profileEdit);
  const ProfileEditError = useSelector((state) => state.profileEditState.error);

  useEffect(() => {
    if (ProfileEditError) {
      setAlertMsg(ProfileEditError.message);
    }
    else if (ProfileEdit) {
      setAlertMsg(ProfileEdit.message)
    }
  }, [ProfileEdit, ProfileEditError]);

  useEffect(() => {
    dispatch({ type: 'COUNTRY_REQUEST' });
    dispatch({ type: 'BRANCH_REQUEST' });
    dispatch({ type: 'ROLES_REQUEST' });
  }, []);

  useEffect(() => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setMobile(data.mobile);
    setUserName(data.username);
    setUuid(data.uuid);
    setRoleId({
      value: data.roles.id,
      label: data.roles.name
    });
    setCountryId({
      value: data.country && data.country.id,
      label: data.country && data.country.countryName
    });
    setBranchId({
      value: data.branch && data.branch.id,
      label: data.branch && data.branch.branchName
    });
    setAlertMsg("");
  }, [data]);

  const updateHandler = () => {
    if (firstName == '' || lastName === '' || roleId === '' || userName === '' || countryId === '' || branchId === null) {
      setAlertMsg("Please enter all the required details")
      setErrorAlert("error-alert")
    } else if (mobile && mobile !== "" && mobile.length < 10) {
      setAlertMsg("Please enter a valid mobile number of atleast ten characters")
      setErrorAlert("error-alert")
    } else {
      const payload = {
        id: data.id,
        firstName,
        lastName,
        email,
        mobile,
        uuid,
        roleId: roleId.value,
        countryId: countryId.value,
        branchId: branchId.value
      };
      dispatch(profileEditRequest(payload));
      setErrorAlert('');
      setAlertMsg('')
    }
  };

  const FirstNameValidator = (e) => {
    if (/^(?![\s-])[\A-Za-z\s-]*$/.test(e.target.value)) {
      setFirstName(e.target.value)
    }
  };

  const LastNameValidator = (e) => {
    if (/^(?![\s-])[\A-Za-z\s-]*$/.test(e.target.value)) {
      setLastName(e.target.value)
    }
  };

  const MobileValidator = (e) => {
    if (e.target.value.match('^[0-9]*$') != null) {
      setMobile(e.target.value);
    }
  };

  const Rolehandler = (role) => {
    setRoleId(role)
  }

  const Countryhandler = (country) => {
    setCountryId(country)
    setBranchId(null)
  }

  const Branchhandler = (branch) => {
    setBranchId(branch)
  }

  const SmartHealthValidator = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9]*$')) {
      setUuid(e.target.value)
    }
  }

  // role options 
  const roleOptions = roles && roles.map((data) => ({
    value: data.id,
    label: `${data.name}`,
  }))
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
  // alertMsg class name checking
  const alert = ProfileEditError ? 'alertfalse' : 'alertsuccess';
  const alertClassName = errorAlert ? 'alertfalse' : alert;

  return (
    <div className="main-content-inner">
      <Grid fluid>
        <Row>
          <Col md={6}>
            <Row>
              <Col md={12}><h5>Profile Details</h5></Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <FormGroup>
                  <ControlLabel className="col-md-12"><strong className="profile-label">First Name:</strong><span className="star"> *</span></ControlLabel>
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormControl className={firstName === '' && errorAlert} value={firstName} type="text" onChange={FirstNameValidator} maxLength={30} />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <FormGroup>
                  <ControlLabel className="col-md-12"><strong className="profile-label">Last Name:</strong><span className="star"> *</span></ControlLabel>
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormControl className={lastName === '' && errorAlert} value={lastName} type="text" onChange={LastNameValidator} maxLength={30} />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <FormGroup>
                  <ControlLabel className="col-md-12"><strong className="profile-label">Mobile:</strong></ControlLabel>
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormControl value={mobile} type="text" onChange={MobileValidator} maxLength={15} className={mobile &&(mobile.length < 10 && mobile != "") && errorAlert} />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <FormGroup>
                  <ControlLabel className="col-md-12"><strong className="profile-label">Email:</strong></ControlLabel>
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormControl disabled defaultValue={email} type="email" maxLength={50} />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <FormGroup>
                  <ControlLabel className="col-md-12"><strong className="profile-label">Username:</strong></ControlLabel>
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormControl disabled defaultValue={userName} type="text" />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <FormGroup>
                  <ControlLabel className="col-md-12"><strong className="profile-label">User Role:</strong><span className="star"> *</span></ControlLabel>
                </FormGroup>
              </Col>
              <Col md={9}>
                <Select
                  name="userRole"
                  value={roleId}
                  onChange={Rolehandler}
                  options={roleOptions}
                  className={roleId === '' && errorAlert}
                  isDisabled={roleName == "ADMIN" ? true : false}
                  styles={customStyles}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <FormGroup>
                  <ControlLabel className="col-md-12"><strong className="profile-label">Smart Health UUID:</strong></ControlLabel>
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormControl value={uuid} type="text" onChange={SmartHealthValidator} maxLength={8} />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <FormGroup>
                  <ControlLabel className="col-md-12"><strong className="profile-label">COUNTRY:</strong><span className="star"> *</span></ControlLabel>
                </FormGroup>
              </Col>
              <Col md={9}>
                <Select
                  name="country"
                  value={countryId}
                  onChange={Countryhandler}
                  options={countryOptions}
                  isSearchable
                  className={countryId === '' && errorAlert}
                  styles={customStyles}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <FormGroup>
                  <ControlLabel className="col-md-12"><strong className="profile-label">BRANCH:</strong><span className="star"> *</span></ControlLabel>
                </FormGroup>
              </Col>
              <Col md={9}>
                <Select
                  name="country"
                  value={branchId}
                  onChange={Branchhandler}
                  options={branchOptions}
                  isSearchable
                  isDisabled={countryId.value ? false : true}
                  className={branchId === null && errorAlert}
                  styles={customStyles}
                />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <div className="category">
                  <span className="star">*</span> Required fields
                </div>
              </Col>
              <Col md={12}><p className={alertClassName}>{alertMsg}</p></Col>
              <FormGroup>
                <Col md={9} mdOffset={3}>
                  <Button
                    fill
                    wd
                    onClick={() => {
                      updateHandler();
                    }}
                  >
                    Update
                  </Button>
                </Col>
              </FormGroup>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Profile;
