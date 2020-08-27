import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

// components
import TransactionList from '../transactions/TransactionList';
import TransactionFAB from '../transactions/TransactionFAB';

const Transactions = ({ account: { success, account } }) => {
  return (
    <div className="container">
      <div className="page-header">
        <Link to="/accounts" className="left">
          <i className="material-icons">arrow_back</i>
        </Link>
        Transactions
      </div>
      {success && (
        <div style={accountDetailStyle}>
          <h6 style={{ marginBottom: '0' }}>
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
          <div className="grey-text" style={{ fontSize: '10px' }}>
            <span>Account name</span>
            <span className="right">Balance</span>
          </div>
        </div>
      )}
      <TransactionList />
      <div className="fixed-action-btn">
        <Link
          to="/transactions/form"
          className="btn-floating btn green darken-2"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

const accountDetailStyle = {
  margin: '1.6rem 0',
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps)(Transactions);
