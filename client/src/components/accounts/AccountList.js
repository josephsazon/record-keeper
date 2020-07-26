import React, { useState, Fragment, useEffect } from 'react';

// components
import AccountItem from './AccountItem';
import Preloader from '../layout/Preloader';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setLoading] = useState(false);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    setLoading(true);

    try {
      const res = await fetch('/accounts');
      const data = await res.json();

      setAccounts(data);
    } catch (err) {}
    setLoading(false);
  };

  if (accountsLoading) return <Preloader />;

  return (
    <Fragment>
      <div className="row">
        {accounts.map((account) => (
          <div className="col s12 m6 l4">
            <AccountItem key={account.id} account={account} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default AccountList;
