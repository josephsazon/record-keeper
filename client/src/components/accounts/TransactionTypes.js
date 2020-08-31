import React from 'react';
import { connect } from 'react-redux';

// state
import { setCurrentTransactionType } from '../../state/actions/transactionTypeActions';

// components
import TransactionTypeItem from './TransactionTypeItem';

// styles
import './TransactionTypes.css';

const TransactionTypes = ({
  history,
  transactionTypes,
  setCurrentTransactionType,
}) => {
  return (
    <div className="transaction-types">
      <div className="transaction-types__header">Transaction types</div>
      <ul className="collection">
        <TransactionTypeItem
          name="Add transaction type..."
          icon="add"
          iconColor="blue"
          onClick={() =>
            history.push('/account/settings/transaction-type/form')
          }
        />
        {transactionTypes.map((transactionType) => {
          const { name, icon, entryType } = transactionType;
          const onClick = () => {
            setCurrentTransactionType(transactionType);
            history.push('/account/settings/transaction-type/form');
          };

          return (
            <TransactionTypeItem
              key={transactionType._id}
              name={name}
              icon={icon}
              entryType={entryType}
              onClick={onClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default connect(null, { setCurrentTransactionType })(TransactionTypes);
