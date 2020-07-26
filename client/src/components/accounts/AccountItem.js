import React from 'react';
import { Link } from 'react-router-dom';

const AccountItem = ({ account }) => {
  const { name, balance, updatedDate, updatedBy } = account;

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">{name}</span>
        <ul>
          <li>
            <strong>Balance: </strong>
            {balance}.00
          </li>
          <li>
            <strong>Updated date: </strong>
            {updatedDate}
          </li>
          <li>
            <strong>Updated by: </strong>
            {updatedBy}
          </li>
        </ul>
      </div>
      <div className="card-action">
        <Link to="/transactions" className="waves-effect">
          <span className="blue-text">View Transactions</span>
        </Link>
      </div>
    </div>
  );
};

export default AccountItem;
