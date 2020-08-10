import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import { getTransactions } from '../../state/actions/transactionActions';

// components
import Preloader from '../layout/Preloader';
import Spinner from '../layout/Spinner';
import TransactionItem from './TransactionItem';

const TransactionList = ({
  transaction: { transactions, success, loading, page, limit, hasNextPage },
  getTransactions,
}) => {
  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  useEffect(() => {
    getTransactions(1, 10);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (transactions) {
      if (displayedTransactions && page === 1) {
        setDisplayedTransactions(transactions);
      } else {
        setDisplayedTransactions([...displayedTransactions, ...transactions]);
      }
    }
    // eslint-disable-next-line
  }, [transactions]);

  useEffect(() => {
    return setDisplayedTransactions([]);
  }, []);

  const onLoadMoreClick = () => {
    getTransactions(page + 1, 10);
  };

  return (
    <Fragment>
      {success && (
        <ul className="collapsible">
          {displayedTransactions.map((transaction) => (
            <TransactionItem key={transaction._id} transaction={transaction} />
          ))}
        </ul>
      )}
      {hasNextPage && (
        <div style={{ display: 'flex' }}>
          <div style={{ margin: 'auto', marginBottom: '20px' }}>
            {loading ? (
              <Spinner />
            ) : (
              <button
                className="btn-flat waves-effect"
                onClick={onLoadMoreClick}
              >
                Load more
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
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
