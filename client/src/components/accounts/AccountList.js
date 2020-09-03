import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import {
  getAccounts,
  resetGetAccountsState,
} from '../../state/actions/accountActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import AccountItem from './AccountItem';
import Spinner from '../layout/Spinner';

// styles
import './AccountList.css';

const AccountList = ({
  accountState,
  getAccounts,
  resetGetAccountsState,
  history,
}) => {
  const {
    accounts,
    error,
    getAccountsLoading,
    getAccountsSuccess,
    getAccountsTriggered,
    hasNextPage,
    page,
  } = accountState;
  const [allAccounts, setAllAccounts] = useState([]);

  useEffect(() => {
    getAccounts(1, 10);

    return () => {
      resetGetAccountsState();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (getAccountsTriggered) {
      if (getAccountsSuccess) {
        setAllAccounts([...allAccounts, ...accounts]);
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [getAccountsTriggered]);

  const onLoadMoreClick = () => {
    getAccounts(page + 1, 10);
  };

  return (
    <div className="account-list">
      <div className="row">
        {allAccounts &&
          allAccounts.map((account) => (
            <div className="col s12 m6 l4" key={account._id}>
              <AccountItem account={account} history={history} />
            </div>
          ))}
      </div>
      <div className="account-list__bottom-placeholder">
        {getAccountsLoading ? (
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

AccountList.propTypes = {
  accountState: PropTypes.object.isRequired,
  getAccounts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  accountState: state.account,
});

export default connect(mapStateToProps, { getAccounts, resetGetAccountsState })(
  AccountList
);
