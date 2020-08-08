import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

// state
import { getAccount } from '../../state/actions/accountActions';

// components
import TransactionList from '../transactions/TransactionList';
import TransactionFAB from '../transactions/TransactionFAB';

const Transactions = ({ account: { success, account }, match, getAccount }) => {
  useEffect(() => {
    getAccount(match.params.accountId);
    // eslint-disable-next-line;
  }, []);

  return (
    <div className="container">
      <h4 className="center">
        <Link to="/accounts" className="left">
          <i className="material-icons">arrow_back</i>
        </Link>
        <span>Transactions</span>
      </h4>
      {success && (
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
      <TransactionFAB />
    </div>
  );
};

const accountDetailStyle = {
  margin: '1.6rem 0',
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { getAccount })(Transactions);
