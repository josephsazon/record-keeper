import React from 'react';

// components
import TransactionTypeItem from './TransactionTypeItem';

// styles
import './TransactionTypes.css';

const TransactionTypes = ({ transactionTypes }) => {
  return (
    <div className="transaction-types">
      <div className="transaction-types__header">Transaction types</div>
      <ul className="collection">
        {transactionTypes.map((transactionType) => {
          const { name, icon, entryType } = transactionType;

          return (
            <TransactionTypeItem
              key={transactionType._id}
              name={name}
              icon={icon}
              entryType={entryType}
            />
          );
        })}
        <TransactionTypeItem
          name="Add transaction type..."
          icon="add"
          iconColor="blue"
        />
      </ul>
    </div>
  );
};

export default TransactionTypes;
