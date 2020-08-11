import React from 'react';

// components
import AccountList from '../accounts/AccountList';

const Accounts = ({ history }) => {
  return (
    <div className="container">
      <div className="page-header">Accounts</div>
      <AccountList history={history} />
    </div>
  );
};

export default Accounts;
