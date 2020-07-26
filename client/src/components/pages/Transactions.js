import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// components
import TransactionList from '../transactions/TransactionList';
import NumberFormat from 'react-number-format';

const Transactions = () => {
  const [account, setAccount] = useState({});
  const [accountSuccess, setAccountSuccess] = useState(false);

  useEffect(() => {
    getAccount('1');
    // eslint-disable-next-line
  }, []);

  const getAccount = async (id) => {
    setAccountSuccess(false);

    try {
      const res = await fetch(`/accounts?q=${id}`);
      const data = await res.json();

      setAccount(data[0]);
      setAccountSuccess(true);
    } catch (err) {}
  };

  return (
    <div className="container">
      <h4 className="center">
        <Link to="/accounts" className="left">
          <i className="material-icons ">arrow_back</i>
        </Link>
        <span>Transactions</span>
      </h4>
      {accountSuccess && (
        <div style={accountDetailStyle}>
          <h6>
            <span>{account.name}</span>
            <span className="right">
              <NumberFormat
                value={account.balance}
                thousandSeparator={true}
                displayType="text"
                prefix="₱"
              />
            </span>
          </h6>
        </div>
      )}
      <TransactionList />
    </div>
  );
};

const accountDetailStyle = {
  margin: '1.6rem 0',
};

export default Transactions;
