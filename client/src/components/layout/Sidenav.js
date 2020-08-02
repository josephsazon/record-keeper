import React from 'react';
import { Link } from 'react-router-dom';

const Sidenav = () => {
  return (
    <ul id="slide-out" className="sidenav sidenav-close">
      <li>
        <div className="user-view">
          <a href="#!">Joseph Sazon</a>
          <Link to="/login" className="secondary-content">
            <i className="material-icons">keyboard_tab</i>
          </Link>
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
    </ul>
  );
};

export default Sidenav;
