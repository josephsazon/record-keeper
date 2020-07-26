import React, { Fragment } from 'react';

// components
import AccountList from '../accounts/AccountList';

const Accounts = () => {
  return (
    <div className="container">
      <h4 className="center">Accounts</h4>
      <AccountList />
    </div>
  );
};

export default Accounts;
