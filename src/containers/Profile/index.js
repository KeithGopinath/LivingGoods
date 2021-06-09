/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileComponent from '../../components/Profile'
import { getProfileRequest } from '../../actionCreators/Profile';

class Profile extends Component {

  constructor(props) {
    super(props)
    this.setState = {
      requestComplete: false
    }
  }

  componentDidMount() {
    this.props.getProfileRequest()
  }

  render() {
    const { profile } = this.props.profile;
    return (
      <div>
        {profile && <ProfileComponent data={profile} />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  profile: state.profileState,
});

const mapDispatchToProps = (dispatch) => ({
  getProfileRequest: () => dispatch(getProfileRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
