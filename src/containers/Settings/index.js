/* eslint-disable */
import React from 'react';
import { Grid, Col, Row, Tab, Nav, NavItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Headerbar from '../../components/HeaderBar';
import Profile from '../Profile';
import Roles from '../../components/Roles';
import Emailtemplates from '../EmailTemplates';
import EmailSettings from '../EmailSettings';
import Sidebar from '../../components/SideBar';
import { history } from '../../routes';
import './style.scss';
import Card from '../../components/Card';

const Settings = () => {
  const login = useSelector((state) => state.loginState.login);
  const username = login ? login.username : sessionStorage.username
  const rolename = login ? login.roleName : sessionStorage.rolename
  const role = rolename === 'ADMIN' ? true : false

  return (
    <div className="wrapper">
      <Sidebar history={history} />
      <div className="main-panel">
        <Headerbar headerName="Settings" />
        <div className="main-content">
          <Grid fluid>
            <Row>
              <Card
                title="Settings"
                category="User profile settings"
                content={
                  <div>
                    <Row className="settings-page">
                      <Col md={12} className="settings-link-enc">
                        <Tab.Container id="tabs-with-dropdown" defaultActiveKey="profile">
                          <Row className="clearfix">
                            <Col sm={12}>
                              <Nav bsStyle="tabs">
                                <NavItem eventKey="profile">
                                  <i className="fa fa-user" /> Profile
                                </NavItem>
                                <NavItem eventKey="roles">
                                  <i className="fa fa-lock" /> Roles and Permissions
                                </NavItem>
                                <NavItem eventKey="emailtemplates" disabled={role}>
                                  <i className="fa fa-envelope" /> Email Templates
                                </NavItem>
                                <NavItem eventKey="emailsettings" disabled={role}>
                                  <i className="fa fa-cog" />Env Settings
                                </NavItem>
                              </Nav>
                            </Col>
                            <Col sm={12}>
                              <Tab.Content>
                                <Tab.Pane eventKey="profile" mountOnEnter unmountOnExit>
                                  <Profile username={username} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="roles" mountOnEnter unmountOnExit>
                                  <Roles />
                                </Tab.Pane>
                                <Tab.Pane eventKey="emailtemplates" mountOnEnter unmountOnExit>
                                  <Emailtemplates />
                                </Tab.Pane>
                                <Tab.Pane eventKey="emailsettings" mountOnEnter unmountOnExit>
                                  <EmailSettings />
                                </Tab.Pane>
                              </Tab.Content>
                            </Col>
                          </Row>
                        </Tab.Container>
                      </Col>
                    </Row>
                  </div>
                }
              />
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Settings;


