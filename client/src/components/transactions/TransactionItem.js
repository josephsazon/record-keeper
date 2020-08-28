import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

// components
import InfoPair from '../layout/InfoPair';
import M from 'materialize-css/dist/js/materialize.min.js';

// styles
import './TransactionItem.css';

const TransactionItem = ({ accountState, transaction }) => {
  const { account } = accountState;

  useEffect(() => {
    M.AutoInit();
  }, []);

  const {
    amount,
    assignedTo,
    balance,
    createdBy,
    createdDate,
    description,
    entryType,
    icon,
    product,
    type,
  } = transaction;

  const getIcon = () => {
    const transactionType = account.transactionTypes.find(
      (transactionType) =>
        transactionType.name.toLowerCase() === type.toLowerCase()
    );

    if (transactionType) {
      return transactionType.icon;
    } else {
      return icon || 'attach_money';
    }
  };

  return (
    <li className="transaction-item">
      <div className="transaction-item__header collapsible-header">
        <i className="transaction-item__icon material-icons grey-text text-lighten-1">
          {getIcon()}
        </i>
        <div>
          <span className="transaction-item__type truncate">{type}</span>
          <div className="transaction-item__date">
            <Moment calendar className="grey-text">
              {createdDate}
            </Moment>
          </div>
        </div>
        <div className="transaction-item__amount collapsible-secondary">
          <span
            className={
              entryType === 'debit' ? 'red-text' : 'green-text text-darken-2'
            }
          >
            {entryType === 'debit' ? '-' : '+'}
            <NumberFormat
              value={amount}
              displayType="text"
              prefix="₱"
              thousandSeparator={true}
            />
          </span>
        </div>
      </div>
      <div className="collapsible-body">
        <div className="row">
          <InfoPair label="Description" value={description} />
          <InfoPair
            label="Balance"
            value={
              <NumberFormat
                value={balance}
                displayType="text"
                prefix="₱"
                thousandSeparator={true}
              />
            }
            col="s6"
          />
          {product && <InfoPair label="Product" value={product} col="s6" />}
          <InfoPair label="Assigned to" value={assignedTo} col="s6" />
          <InfoPair label="Created by" value={createdBy} col="s6" />
          <InfoPair
            label="Date"
            value={
              <Moment format="MMMM Do YYYY, h:mm:ss a">{createdDate}</Moment>
            }
            col="s6"
          />
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = (state) => ({
  accountState: state.account,
});

export default connect(mapStateToProps)(TransactionItem);
