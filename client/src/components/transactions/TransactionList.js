import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import {
  getTransactions,
  resetGetTransactionsState,
} from '../../state/actions/transactionActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import Spinner from '../layout/Spinner';
import TransactionItem from './TransactionItem';

// styles
import './TransactionList.css';

const TransactionList = ({
  transactionState,
  getTransactions,
  resetGetTransactionsState,
}) => {
  const {
    error,
    getTransactionsLoading,
    getTransactionsSuccess,
    getTransactionsTriggered,
    hasNextPage,
    page,
    transactions,
  } = transactionState;
  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  useEffect(() => {
    getTransactions(1, 10);

    return () => {
      resetGetTransactionsState();
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (getTransactionsTriggered) {
      if (getTransactionsSuccess) {
        setDisplayedTransactions([...displayedTransactions, ...transactions]);
      } else {
        M.toast({ html: error });
      }
    }
  }, [getTransactionsTriggered]);

  const onLoadMoreClick = () => {
    getTransactions(page + 1, 10);
  };

  return (
    <div className="transaction-list">
      {displayedTransactions.length > 0 && (
        <ul className="collapsible">
          {displayedTransactions.map((transaction) => (
            <TransactionItem key={transaction._id} transaction={transaction} />
          ))}
        </ul>
      )}
      <div className="transaction-list__bottom-placeholder">
        {getTransactionsLoading ? (
          <Spinner />
        ) : (
          hasNextPage && (
            <button className="btn-flat waves-effect" onClick={onLoadMoreClick}>
              Load more
            </button>
          )
        )}
      </div>
    </div>
  );
};

TransactionList.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transactionState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  transactionState: state.transaction,
});

export default connect(mapStateToProps, {
  getTransactions,
  resetGetTransactionsState,
})(TransactionList);
