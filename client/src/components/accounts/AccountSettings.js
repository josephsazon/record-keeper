import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import {
  deleteAccount,
  resetDeleteAccountState,
} from '../../state/actions/accountActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import AccountDetails from './AccountDetails';
import TransactionTypes from './TransactionTypes';
import CurrentUsers from '../accountSettings/CurrentUsers';
import ConfirmModal from '../layout/ConfirmModal';
import Preloader from '../layout/Preloader';

const AccountSettings = ({
  accountState,
  authState,
  history,
  deleteAccount,
}) => {
  const {
    account,
    error,
    deleteAccountLoading,
    deleteAccountSuccess,
    deleteAccountTriggered,
  } = accountState;

  useEffect(() => {
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (deleteAccountTriggered) {
      if (deleteAccountSuccess) {
        M.toast({ html: 'Successfully deleted account.' });
        resetDeleteAccountState();
        history.push('/accounts');
      } else {
        M.toast({ html: error });
      }
    }
  });

  const onAddUser = () => {
    history.push('/account/settings/add-user');
  };

  const onDelete = () => {
    deleteAccount();
  };

  return (
    <div className="container">
      <ConfirmModal
        id="confirmDeleteAccountModal"
        title="Confirmation"
        message="Do you want to delete this account?"
        onSubmit={onDelete}
      />
      <div className="page-header">
        <Link to="/accounts" className="left">
          <i className="material-icons">arrow_back</i>
        </Link>
        Account Settings
        {authState.user.username === account.createdBy && (
          <a href="#confirmDeleteAccountModal" className="modal-trigger right">
            <i className="material-icons grey-text">delete</i>
          </a>
        )}
      </div>
      {deleteAccountLoading && <Preloader />}
      <div className="divider"></div>
      <AccountDetails account={account} />
      <div className="divider"></div>
      <TransactionTypes
        transactionTypes={account.transactionTypes}
        history={history}
      />
      <div className="divider"></div>
      <CurrentUsers users={account.users} onAddUser={onAddUser} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountState: state.account,
  authState: state.auth,
});

export default connect(mapStateToProps, {
  deleteAccount,
  resetDeleteAccountState,
})(AccountSettings);
