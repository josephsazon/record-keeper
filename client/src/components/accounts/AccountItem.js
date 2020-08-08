import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

const AccountItem = ({ account }) => {
  const { name, balance, updatedDate, updatedBy } = account;

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">{name}</span>
        <div className="row">
          <div className="col s12">
            <div className="col s6">
              <strong>Balance</strong>
            </div>
            <div className="col s6">
              <NumberFormat
                value={balance}
                displayType="text"
                thousandSeparator={true}
                prefix="₱"
              />
            </div>
          </div>

          <div className="col s12">
            <div className="col s6">
              <strong>Updated by</strong>
            </div>
            <div className="col s6">{updatedBy}</div>
          </div>

          <div className="col s12">
            <div className="col s6">
              <strong>Updated date</strong>
            </div>
            <div className="col s6">
              <Moment format="MMMM Do YYYY, h:mm:ss a">{updatedDate}</Moment>
            </div>
          </div>
        </div>
      </div>
      <div className="card-action">
        <Link
          to={{ pathname: `/${account._id}/transactions` }}
          className="waves-effect"
        >
          <span className="blue-text">View Transactions</span>
        </Link>
      </div>
    </div>
  );
};

export default AccountItem;
