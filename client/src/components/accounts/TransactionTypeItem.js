import React from 'react';

// styles
import './TransactionTypeItem.css';

const TransactionTypeItem = ({ entryType, icon, iconColor, name }) => {
  return (
    <li
      className="collection-item transaction-type-item"
      onClick={() => console.log(name)}
    >
      <i
        className={`material-icons ${iconColor || 'grey'}-text text-lighten-1`}
      >
        {icon}
      </i>
      <span className="transaction-type-item__text">{name}</span>
      <div className="secondary-content">
        <span
          className={`${entryType === 'debit' ? 'red-text' : 'green-text'}`}
        >
          {entryType}
        </span>
      </div>
    </li>
  );
};

export default TransactionTypeItem;
