import React from 'react';
import { Link } from 'react-router-dom';

// components
import AccountList from '../accounts/AccountList';

const Accounts = ({ history }) => {
  return (
    <div className="container">
      <div className="page-header">Accounts</div>
      <AccountList history={history} />
      <div className="fixed-action-btn">
        <Link to="/account/form" className="btn-floating btn blue lighten-2">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Accounts;
