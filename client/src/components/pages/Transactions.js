import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

// state
import {
  getAccount,
  clearAccountToken,
} from '../../state/actions/accountActions';

// components
import TransactionList from '../transactions/TransactionList';
import TransactionFAB from '../transactions/TransactionFAB';

const Transactions = ({
  account: { success, account, accountToken },
  clearAccountToken,
  getAccount,
}) => {
  useEffect(() => {
    if (accountToken) {
      getAccount();
    }
    // eslint-disable-next-line;
  }, [accountToken]);

  return (
    <div className="container">
      <div className="page-header">
        <Link
          to="/accounts"
          className="left"
          onClick={() => clearAccountToken()}
        >
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

export default connect(mapStateToProps, { clearAccountToken, getAccount })(
  Transactions
);
