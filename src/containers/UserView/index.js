/*eslint-disable*/
import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Headerbar from '../../components/HeaderBar';
import Sidebar from '../../components/SideBar';
import { history } from '../../routes';
import Card from '../../components/Card';
import './style.scss'

const UserView = (props) => {
  const user = props.location.state
  const not_provided = <i>Not provided</i>

  return (
    <div className="wrapper">
      <Sidebar history={history} />
      <div className="main-panel">
        <Headerbar headerName="View User" />
        <div className="main-content">
          <Grid fluid>
            <Row>
              <Card
                content={
                  <Grid fluid style={{ minHeight: 500 }}>
                    <Row>
                      <Col lg={6} lgOffset={3} className='user-view-content-enc'>
                        <Row>
                          <h2 className='text-center user-view-icon-enc'><i className="fa fa-user user-view-icon" /></h2>
                        </Row>
                        <Row>
                          <Col sm={12}>
                            <dl>
                              <Row>
                                <Col sm={10} smOffset={2} className="wordbreak">
                                  <Row>
                                    <Col sm={6}><h4 className='user-view-label'>First Name</h4></Col>
                                    <Col sm={6}><h5>{user.firstName !== '--' ? user.firstName : not_provided}</h5></Col>
                                  </Row>
                                  <Row>
                                    <Col sm={6}><h4 className='user-view-label'>Last Name</h4></Col>
                                    <Col sm={6}><h5>{user.lastName !== '--' ? user.lastName : not_provided}</h5></Col>
                                  </Row>
                                  <Row>
                                    <Col sm={6}><h4 className='user-view-label'>Mobile</h4></Col>
                                    <Col sm={6}><h5>{user.mobile !== '--' && user.mobile !== '' && user.mobile !== null ? user.mobile : not_provided}</h5></Col>
                                  </Row>
                                  <Row>
                                    <Col sm={6}><h4 className='user-view-label'>Email</h4></Col>
                                    <Col sm={6}><h5>{user.email !== '--' ? user.email : not_provided}</h5></Col>
                                  </Row>
                                  <Row>
                                    <Col sm={6}><h4 className='user-view-label'>Username</h4></Col>
                                    <Col sm={6}><h5>{user.username !== '--' ? user.username : not_provided}</h5></Col>
                                  </Row>
                                  <Row>
                                    <Col sm={6}><h4 className='user-view-label'>User Role</h4></Col>
                                    <Col sm={6}><h5>{user.roles.name ? user.roles.name : not_provided}</h5></Col>
                                  </Row>
                                  <Row>
                                    <Col sm={6}><h4 className='user-view-label'>Smart Health UUID</h4></Col>
                                    <Col sm={6}><h5>{user.uuid !== '--' && user.uuid !== '' && user.uuid !== null ? user.uuid : not_provided}</h5></Col>
                                  </Row>
                                  <Row>
                                    <Col sm={6}><h4 className='user-view-label'>Country</h4></Col>
                                    <Col sm={6}><h5>{user.country ? user.country.countryName : not_provided}</h5></Col>
                                  </Row>
                                  <Row>
                                    <Col sm={6}><h4 className='user-view-label'>Branch</h4></Col>
                                    <Col sm={6}><h5>{user.branch ? user.branch.branchName : not_provided}</h5></Col>
                                  </Row>
                                </Col>
                              </Row>
                            </dl>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Grid>
                } />
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default UserView;

