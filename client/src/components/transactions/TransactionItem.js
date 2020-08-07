import React, { useEffect } from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

// components
import InfoPair from '../layout/InfoPair';
import M from 'materialize-css/dist/js/materialize.min.js';

const TransactionItem = ({ transaction }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const {
    amount,
    balance,
    createdBy,
    createdDate,
    entryType,
    description,
    type,
    worker,
  } = transaction;

  const getIcon = () => {
    switch (type) {
      case 'labor':
      case 'Labor':
        return 'directions_walk';
      case 'materials':
      case 'Materials':
        return 'local_grocery_store';
      case 'inflow':
        return 'attach_money';
      default:
        return 'local_offer';
    }
  };

  return (
    <li>
      <div className="collapsible-header" style={collapsibleHeaderStyle}>
        <i className={`material-icons grey-text text-lighten-1`}>{getIcon()}</i>
        <span className="truncate">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>

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
          <InfoPair label="Assigned to" value={worker} col="s6" />
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

const collapsibleHeaderStyle = { position: 'relative' };

const collapsibleSecondaryStyle = {
  position: 'absolute',
  right: '0',
  paddingRight: '1rem',
};

export default TransactionItem;
