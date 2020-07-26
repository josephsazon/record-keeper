import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

// components
import InfoPair from '../layout/InfoPair';

const TransactionItem = ({ transaction }) => {
  const {
    amount,
    balance,
    createdBy,
    date,
    entryType,
    name,
    purpose,
    type,
    worker,
  } = transaction;

  return (
    <li>
      <div className="collapsible-header" style={collapsibleHeaderStyle}>
        <i className="material-icons green-text text-lighten-1">
          monetization_on
        </i>
        <span className="truncate">{name}</span>

        <div
          className="collapsible-secondary"
          style={collapsibleSecondaryStyle}
        >
          <span
            className={
              entryType === 'debit' ? 'red-text' : 'green-text text-darken-2'
            }
          >
            <strong>
              {entryType === 'debit' ? '-' : '+'}
              <NumberFormat
                value={amount}
                displayType="text"
                prefix="₱"
                thousandSeparator={true}
              />
            </strong>
          </span>
        </div>
      </div>
      <div className="collapsible-body">
        <div className="row">
          <InfoPair
            label="Amount"
            value={
              <NumberFormat
                value={amount}
                displayType="text"
                prefix="₱"
                thousandSeparator={true}
              />
            }
            col="s6"
          />
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
          <InfoPair
            label="Type"
            value={type.charAt(0).toUpperCase() + type.slice(1)}
            col="s6"
          />
          <InfoPair label="Worker" value={worker} col="s6" />
          <InfoPair label="Created by" value={createdBy} col="s6" />
          <InfoPair
            label="Date"
            value={<Moment format="MMMM Do YYYY">{date}</Moment>}
            col="s6"
          />
          <InfoPair label="Description" value={purpose} />
        </div>
      </div>
    </li>
  );
};

const collapsibleHeaderStyle = { position: 'relative' };

const collapsibleSecondaryStyle = {
  position: 'absolute',
  right: '0',
  paddingRight: '1rem',
};

export default TransactionItem;
