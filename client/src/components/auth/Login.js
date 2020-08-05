import React, { useState } from 'react';
import { connect } from 'react-redux';

// state
import { login } from '../../state/actions/authActions';

const Login = ({ login }) => {
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
      <h4 className="center">Login</h4>
      <div className="row">
        <form onSubmit={onSubmit}>
          <div className="input-field col s12">
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
          <div className="input-field col s12">
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
          <div className="col s12">
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
    </div>
  );
};

export default connect(null, { login })(Login);
