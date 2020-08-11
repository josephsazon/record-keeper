import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

// state
import {
  clearAccountToken,
  getAccount,
} from '../../state/actions/accountActions';

// components
import AccountType from './AccountType';

// styles
import './AccountSettings.css';

const AccountSettings = ({ account, clearAccountToken, getAccount }) => {
  useEffect(() => {
    getAccount();
  }, []);

  const { createdBy, createdDate, name } = account;
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
      <div className="account-settings__subheader">
        <h6>Account details</h6>
      </div>
      <div className="account-details">
        <div className="row">
          <div className="col s6 account-details__key">Account name</div>
          <div className="col s6 account-details__value">{name}</div>
        </div>

        <div className="row">
          <div className="col s6 account-details__key">Created by</div>
          <div className="col s6 account-details__value">{createdBy}</div>
        </div>

        <div className="row">
          <div className="col s6 account-details__key">Created date</div>
          <div className="col s6 account-details__value">
            <Moment format="MMMM Do YYYY">{createdDate}</Moment>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="account-settings__transaction-types">
        <div className="account-settings__subheader">
          <h6 className="">Transaction types</h6>
        </div>
        <ul className="collection">
          <AccountType entryType="credit" type="Inflow" icon="attach_money" />
          <AccountType entryType="debit" type="Labor" icon="directions_walk" />
          <AccountType
            entryType="debit"
            type="Materials"
            icon="local_grocery_store"
          />
          <AccountType entryType="debit" type="Others" icon="local_offer" />
          <AccountType
            type="Add transaction type..."
            icon="add"
            iconColor="blue"
          />
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account.account,
});

export default connect(mapStateToProps, { clearAccountToken, getAccount })(
  AccountSettings
);
