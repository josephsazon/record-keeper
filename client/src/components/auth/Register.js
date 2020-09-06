import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import {
  registerUser,
  resetRegisterUserState,
} from '../../state/actions/userActions';
import { login } from '../../state/actions/authActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import Preloader from '../layout/Preloader';

const Register = ({
  userState,
  login,
  registerUser,
  resetRegisterUserState,
  history,
}) => {
  const {
    error,
    registerUserLoading,
    registerUserSuccess,
    registerUserTriggered,
  } = userState;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    return () => {
      if (registerUserSuccess) {
        resetRegisterUserState();
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (registerUserTriggered) {
      if (registerUserSuccess) {
        M.toast({ html: 'Successfully registered user.' });
        login({ username, password }).then(() => history.push('/'));
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [registerUserTriggered]);

  const onSubmit = () => {
    if (password === confirmPassword) {
      const payload = { username, password };

      registerUser(payload);
    } else {
      M.toast({ html: 'Password does not match.' });
    }
  };

  return (
    <div className="register container">
      <div className="page-header">Register user</div>
      {registerUserLoading && <Preloader />}
      <form>
        <div className="input-field">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm password</label>
        </div>
      </form>
      <div>
        <Link to="/login">Login user</Link>
        <button className="btn-large blue lighten-2 right" onClick={onSubmit}>
          Register
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});

export default connect(mapStateToProps, {
  login,
  registerUser,
  resetRegisterUserState,
})(Register);
