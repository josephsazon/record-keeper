import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import { getTransactions } from '../../state/actions/transactionActions';

// components
import Preloader from '../layout/Preloader';
import TransactionItem from './TransactionItem';

const TransactionList = ({
  transaction: { transactions, success, loading },
  getTransactions,
}) => {
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Preloader />;

  return (
    <ul className="collapsible">
      {success &&
        transactions.map((transaction) => (
          <TransactionItem key={transaction._id} transaction={transaction} />
        ))}
    </ul>
  );
};

TransactionList.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps, { getTransactions })(TransactionList);
