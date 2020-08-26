import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import { clearAccountToken } from '../../state/actions/accountActions';

// components
import AccountDetails from './AccountDetails';
import TransactionTypes from './TransactionTypes';

const AccountSettings = ({ account, clearAccountToken, history }) => {
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
        Account Settings
      </div>
      <div className="divider"></div>
      <AccountDetails account={account} />
      <div className="divider"></div>
      <TransactionTypes
        transactionTypes={account.transactionTypes}
        history={history}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account.account,
});

export default connect(mapStateToProps, { clearAccountToken })(AccountSettings);
