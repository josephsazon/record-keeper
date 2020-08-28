import React, { Fragment } from 'react';

const TransactionTypeOptions = ({ transactionTypes }) => {
  return (
    <Fragment>
      {transactionTypes.map((transactionType) => (
        <option key={transactionType._id}>{transactionType.name}</option>
      ))}
    </Fragment>
  );
};

export default TransactionTypeOptions;
