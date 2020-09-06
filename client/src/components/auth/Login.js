import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import { login, resetLoginState } from '../../state/actions/authActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import Preloader from '../layout/Preloader';

const Login = ({ authState, history, login, resetLoginState }) => {
  const { error, loginLoading, loginSuccess, loginTriggered } = authState;

  // useEffect(() => {
  //   return () => {
  //     resetLoginState();
  //   };
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (loginTriggered) {
      if (loginSuccess) {
        history.push('/');
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [loginTriggered]);

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { username, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <div className="page-header">Login</div>
      {loginLoading && <Preloader />}
      <form onSubmit={onSubmit}>
        <div className="input-field">
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={onChange}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={onChange}
          />
          <label htmlFor="userName">Password</label>
        </div>
        <div>
          <Link to="/register">Register user</Link>
          <button
            type="submit"
            className="btn-large blue lighten-2 waves-effect right"
            style={{ display: 'block' }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  authState: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.auth,
});

export default connect(mapStateToProps, { login, resetLoginState })(Login);
