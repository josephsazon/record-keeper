import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import { logout } from '../../state/actions/authActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';

const Sidenav = ({ accountState, userState, logout }) => {
  const { isAccountAuthenticated } = accountState;
  const { user } = userState;

  useEffect(() => {
    M.AutoInit();
  }, []);

  const onLogout = () => {
    logout();
  };

  return (
    <ul id="slide-out" className="sidenav sidenav-close">
      <li>
        <div className="user-view">
          <Link to="/user/profile">{user ? user.username : null}</Link>
          <a
            href="#!"
            className="secondary-content"
            onClick={onLogout}
            style={{ cursor: 'pointer' }}
          >
            <i className="material-icons blue-text text-lighten-2">
              keyboard_tab
            </i>
          </a>
        </div>
      </li>
      <li className="divider"></li>
      <li>
        <Link to="/" className="waves-effect">
          Home
        </Link>
      </li>
      <li>
        <Link to="/accounts" className="waves-effect">
          Accounts
        </Link>
      </li>
      {isAccountAuthenticated && (
        <Fragment>
          <li className="divider"></li>
          <li>
            <Link to="/transactions" className="waves-effect">
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/products" className="waves-effect">
              Products
            </Link>
          </li>
          <li>
            <Link to="/account/settings" className="waves-effect">
              Account settings
            </Link>
          </li>
        </Fragment>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  accountState: state.account,
  userState: state.user,
});

export default connect(mapStateToProps, { logout })(Sidenav);
