import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

// components
import ChangePasswordForm from '../auth/ChangePasswordForm';

// styles
import './UserProfile.css';

const UserProfile = ({ authState }) => {
  const { username, createdDate } = authState.user;

  console.log(username);
  return (
    <div className="user-profile container">
      <div className="page-header">User profile</div>
      <div className="divider"></div>
      <div className="user-profile__details">
        <div className="user-profile__subheader">User details</div>
        <div className="container">
          <div className="row">
            <div className="col s6">Username</div>
            <div className="col s6">{username}</div>
          </div>
          <div className="row">
            <div className="col s6">Created date</div>
            <div className="col s6">
              <Moment format="MMMM Do YYYY">{createdDate}</Moment>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="user-profile__subheader">Change password</div>
      <ChangePasswordForm />
    </div>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(UserProfile);
