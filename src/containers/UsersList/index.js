/*eslint-disable*/
import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { ExportToCsv } from 'export-to-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import Headerbar from '../../components/HeaderBar';
import Sidebar from '../../components/SideBar';
import { history } from '../../routes';
import Card from '../../components/Card';
import Button from '../../components/CustomButton';
import { getUsersRequest } from '../../actionCreators/UsersList';
import './style.scss';
import PopUp from '../../components/PopUp';
import { getUsersSearchRequest } from '../../actionCreators/UserSearch';
import { superAdminCheck, replaceNull } from '../../utils/containerFunctions';
import Loader from '../../components/Loader';
import { userArchiveRequest } from '../../actionCreators/UserArchive';
import { userActivateRequest } from '../../actionCreators/UserActivate';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      status: true,
      searchUser: '',
      searchState: false,
    };
  }

  componentDidMount() {
    this.props.getUsersRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.userActivate !== this.props.userActivate || prevProps.userArchive !== this.props.userArchive) {
      this.props.getUsersRequest();
    }
  }

  editUser = (item) => {
    const { original } = item;
    history.push({
      pathname: `/users-edit/${original.id}`,
      state: original,
    });
  }

  viewUsers = (item) => {
    const { original } = item;
    history.push({
      pathname: '/users-view/',
      state: original,
    });
  }

  newUser = () => {
    history.push({
      pathname: '/users-new',
    });
  }

  exportUsers = (users) => {
    // Field to be displayed in CSV
    const userList = users.map((item) => ({
      id: item.id,
      active: item.active,
      email: item.email,
      firstName: item.firstName,
      lastName: item.lastName,
      mobile: item.mobile,
      username: item.username,
      uuid: item.uuid,
      branch: item.branch.branchName,
      country: item.country.countryName,
    }))

    const options = {
      filename: 'Users list',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(userList);
  }

  importUsers = () => {
    this.setState({ popup: true });
  }

  hidePopup = () => {
    this.setState({ popup: false });
  }

  // Method for Case insensitive search
  searchMethod = (filter, row) => {
    const { id } = filter;
    return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
  }

  searchChange = (e) => {
    if (/^(?![\s-])[\A-Za-z0-9_@./#&+-\s-]*$/.test(e.target.value)) {
      this.setState({
        searchUser: e.target.value,
      });
    }
    if (e.target.value.length === 0) {
      this.setState({ searchState: false });
    }
  }

  searchUser = () => {
    const { searchUser } = this.state;
    this.props.getUsersSearchRequest(searchUser);
    this.setState({ searchState: true });
  }

  clearSearch = () => {
    this.setState({ searchUser: '' });
    this.setState({ searchState: false });
  }

  SearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchUser()
    }
  }

  handleActive = (original) => {
    original.active ? this.props.userArchiveRequest(original.id) : this.props.userActivateRequest(original.id);
  }

  // condition for checking disabled actions
  DisableCheck = (original) => {
    const disable = superAdminCheck(original.username) && original.active ? false : true;
    return disable;
  }

  render() {
    const { popup, status, searchUser, searchState } = this.state;
    const { users, usersLoading } = this.props.user;
    const { login } = this.props.login;
    const { userSearch, userSearchLoading } = this.props.userSearch;
    const loading = usersLoading || userSearchLoading;
    let userData = searchState ? userSearch : users;
    userData = userData && replaceNull(userData);

    // condition for checking superAdmin
    const superAdminFlag = login ? login.roleName : sessionStorage.rolename;

    return (
      <div className="wrapper">
        <PopUp showPopup={popup} hidePopup={this.hidePopup} title="Import Users List" button="Import Users" status={status} icon={faUserPlus} />
        <Sidebar history={history} />
        <div className="main-panel">
          <Headerbar headerName="Users" />
          <div className="main-content">
            {loading && <Loader />}
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <div className="clearfix">
                    <div className="pull-left mb-4">
                      <h4 className="title vmiddle mt-4">Users list</h4>
                      <div className="vmiddle custom-search-box ml-4">
                        <input type="text" placeholder="Search Users" value={searchUser} onChange={this.searchChange} onKeyPress={this.SearchKeyPress} />
                        {searchUser ?
                          <div className="vmiddle custom-search-box ml-4">
                            <i className="fa fa-close" id="clearicon" onClick={this.clearSearch}></i>
                            <button type="button" onClick={this.searchUser}><i className="fa fa-search"></i></button>
                          </div>
                          : null}
                      </div>
                    </div>
                    <div className="pull-right">
                      <Button block variant="secondary" className="btn-fill table-button mr-4" onClick={() => this.exportUsers(users)}>Export users</Button>
                      <Button block variant="secondary" className="btn-fill table-button mr-4" onClick={this.importUsers}>Import users</Button>
                      <Button block variant="primary" className="btn-fill table-button" onClick={this.newUser}>New user</Button>
                    </div>
                  </div>
                  <Card
                    title=""
                    content={
                      <ReactTable
                        data={userData}
                        filterable
                        columns={[
                          {
                            Header: 'Username',
                            accessor: 'username',
                          },
                          {
                            Header: 'Firstname',
                            accessor: 'firstName',
                          },
                          {
                            Header: 'Lastname',
                            accessor: 'lastName',
                          },
                          {
                            Header: 'Mobile',
                            accessor: 'mobile',
                          },
                          {
                            Header: 'Actions',
                            accessor: 'actions',
                            filterable: false,
                            sortable: false,
                            Cell: (original) => (
                              <div className="actions-centre">
                                <Button bsStyle="warning" simple onClick={() => this.viewUsers(original)}>
                                  <FontAwesomeIcon icon={faEye} title="View User" />
                                </Button>
                                <Button bsStyle="warning" simple onClick={() => this.editUser(original)} disabled={this.DisableCheck(original.original) ? true : false}>
                                  <FontAwesomeIcon icon={faEdit} title="Edit User" className={this.DisableCheck(original.original) ? 'disabledButton' : 'actions-right'} />
                                </Button>
                                <Button bsStyle="warning" simple onClick={() => { this.handleActive(original.original) }} disabled={superAdminFlag == 'SUPER_ADMIN' ? false : true}>
                                  <FontAwesomeIcon icon={faUser} title={original.original.active ? "Active User" : "Archive User"}
                                    className={superAdminFlag == 'SUPER_ADMIN' ? (original.original.active ? "activeUser" : "archiveUser") : "disabledButton"} />
                                </Button>
                              </div>
                            ),
                          },
                        ]}
                        defaultPageSize={10}
                        showPaginationBottom
                        className="-striped -highlight"
                        defaultFilterMethod={this.searchMethod}
                      />
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

UsersList.defaultProps = {
  login: '',
};

const mapStateToProps = (state) => ({
  user: state.usersState,
  userSearch: state.userSearchState,
  userActivate: state.userActivateState,
  userArchive: state.userArchiveState,
  login: state.loginState,
});

const mapDispatchToProps = (dispatch) => ({
  getUsersRequest: () => dispatch(getUsersRequest()),
  getUsersSearchRequest: (searchUser) => dispatch(getUsersSearchRequest(searchUser)),
  userArchiveRequest: (userId) => dispatch(userArchiveRequest(userId)),
  userActivateRequest: (payload) => dispatch(userActivateRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
