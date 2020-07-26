import React, { Fragment } from 'react';

// components
import AccountList from '../accounts/AccountList';

const Accounts = () => {
  return (
    <Fragment>
      <h4 className="center">Accounts</h4>
      <AccountList />
    </Fragment>
  );
};

export default Accounts;
