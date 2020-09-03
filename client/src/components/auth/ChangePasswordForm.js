import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// state
import {
  changePassword,
  resetSubmitAuthState,
} from '../../state/actions/authActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';

// styles
import './ChangePasswordForm.css';
import Spinner from '../layout/Spinner';
import ConfirmModal from '../layout/ConfirmModal';
import { Redirect } from 'react-router-dom';

const ChangePasswordForm = ({
  authState,
  changePassword,
  resetSubmitAuthState,
}) => {
  const {
    error,
    submitAuthLoading,
    submitAuthSuccess,
    submitAuthTriggered,
  } = authState;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    M.AutoInit();

    return () => {
      resetSubmitAuthState();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (submitAuthTriggered) {
      if (submitAuthSuccess) {
        M.toast({ html: 'Successfully changed password.' });
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [submitAuthTriggered]);

  const onSubmit = () => {
    if (newPassword === confirmNewPassword) {
      const payload = { oldPassword, newPassword };

      changePassword(payload);
    } else {
      M.toast({ html: 'Password does not match' });
    }
  };

  return (
    <div className="change-password-form container">
      {submitAuthSuccess && <Redirect to="/" />}
      <ConfirmModal
        id="confirmChangePasswordModal"
        title="Confirmation"
        message="Do you want to change password?"
        onSubmit={onSubmit}
      />
      <form autoComplete="off">
        <div className="input-field">
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label htmlFor="oldPassword">Old password</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="newPassword">New password</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <label htmlFor="confirmNewPassword">Confirm new password</label>
        </div>
      </form>
      <div className="row">
        <div className="col s12 m3 right">
          {submitAuthLoading ? (
            <div className="center-align">
              <Spinner />
            </div>
          ) : (
            <a
              href="#confirmChangePasswordModal"
              className="change-password-form__submit-btn btn-large blue lighten-2 modal-trigger"
            >
              Submit
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
});

export default connect(mapStateToProps, {
  changePassword,
  resetSubmitAuthState,
})(ChangePasswordForm);
