import React from 'react';
import Moment from 'react-moment';

import './AccountDetails.css';

const AccountDetails = ({ account }) => {
  const { name, createdBy, createdDate } = account;

  return (
    <div className="account-details">
      <div className="account-details__header">Account details</div>
      <div className="account-details__content container">
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
    </div>
  );
};

export default AccountDetails;
