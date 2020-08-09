import React from 'react';

// components
import AccountList from '../accounts/AccountList';

const Accounts = ({ history }) => {
  return (
    <div className="container">
      <h4 className="center">Accounts</h4>
      <AccountList history={history} />
    </div>
  );
};

export default Accounts;
