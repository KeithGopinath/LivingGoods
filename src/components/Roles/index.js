/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRolesRequest } from '../../actionCreators/Roles';

class Roles extends Component {
  componentDidMount() {
    this.props.getRolesRequest();
  }

  render() {
    const { roles } = this.props.roles;
    // const roles = [
    //   {
    //     id: 2,
    //     version: 1,
    //     name: 'MANAGER',
    //     description: null,
    //     permissions: null,
    //   },
    //   {
    //     id: 3,
    //     version: 1,
    //     name: 'EMPLOYEE',
    //     description: null,
    //     permissions: null,
    //   },
    //   {
    //     id: 4,
    //     version: 1,
    //     name: 'FIELD_WORKER',
    //     description: null,
    //     permissions: null,
    //   },
    //   {
    //     id: 1,
    //     version: 2,
    //     name: 'SUPER_ADMIN',
    //     description: null,
    //     permissions: {
    //       id: 1,
    //       version: 1,
    //       name: 'Create User',
    //       urlPattern: 'http://15.207.247.13:8080/mdm/user-services/users/',
    //     },
    //   },
    // ];

    return (
      <div>
        <ol>
          {roles && roles.map((role) => {
            // const permission = role.permissions ? <p><strong>Allowed to:</strong> {role.permissions.name}</p> : null;
          // const permission = role.permissions.map(item => <li>{item.name}</li>)
            return (
              <li key={role.id}>
                <h5>{role.name}</h5>
                <p className='mb-5'>{role.name == 'SUPER_ADMIN' ? 'Have God Access. Can View and Edit all records.' : "Can View all records and edit own records"}</p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roles: state.rolesState,
});

const mapDispatchToProps = (dispatch) => ({
  getRolesRequest: () => dispatch(getRolesRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
