import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import {
  addUserToAccount,
  getAccount,
  resetSubmitAccountState,
} from '../../state/actions/accountActions';
import { getUsers, resetGetUsersState } from '../../state/actions/userActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import ConfirmModal from '../layout/ConfirmModal';
import Preloader from '../layout/Preloader';
import Spinner from '../layout/Spinner';
import UserList from '../users/UserList';

// styles
import './AddUserToAccount.css';

const AddUserToAccount = ({
  accountState,
  addUserToAccount,
  userState,
  getAccount,
  getUsers,
  resetGetUsersState,
  resetSubmitAccountState,
}) => {
  const {
    account,
    submitAccountLoading,
    submitAccountSuccess,
    submitAccountTriggered,
  } = accountState;
  const {
    error,
    getAllUsersLoading,
    getAllUsersSuccess,
    getAllUsersTriggered,
    hasNextPage,
    page,
    users,
  } = userState;
  const [allFilteredUsers, setAllFilteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getUsers(1, 10);

    return () => {
      resetGetUsersState();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (getAllUsersTriggered) {
      if (getAllUsersSuccess) {
        const filteredUsers = users.filter((user) => {
          return !account.users.some(
            (accountUser) => accountUser._id === user._id
          );
        });
        setAllFilteredUsers([...allFilteredUsers, ...filteredUsers]);
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [getAllUsersTriggered]);

  useEffect(() => {
    if (submitAccountTriggered) {
      if (submitAccountSuccess) {
        M.toast({ html: `Added '${currentUser.username}' to account.` });
        resetSubmitAccountState();
        getAccount();
      } else {
        M.toast({ html: accountState.error });
      }
    }
    // eslint-disable-next-line
  }, [submitAccountTriggered]);

  const onSubmit = () => {
    const payload = { userId: currentUser._id };

    addUserToAccount(payload);
  };

  const onLoadMoreClick = () => {
    getUsers(page + 1, 10);
  };

  const onSelectUser = (user) => {
    setCurrentUser(user);
    const modalInstance = M.Modal.init(
      document.getElementById('confirmAddUserModal')
    );

    modalInstance.open();
  };

  return (
    <div className="add-user container">
      {submitAccountSuccess && <Redirect to="/account/settings" />}
      <ConfirmModal
        id="confirmAddUserModal"
        title="Confirmation"
        message={`Do you want to add '${currentUser.username}' to this account?`}
        onSubmit={onSubmit}
      />
      <div className="page-header">
        <Link to="/account/settings" className="left">
          <i className="material-icons">arrow_back</i>
        </Link>
        Select user to add
      </div>
      {submitAccountLoading && <Preloader />}
      {getAllUsersTriggered && !hasNextPage && (
        <UserList users={allFilteredUsers} onSelectUser={onSelectUser} />
      )}
      <div className="add-user__bottom-placeholder">
        {getAllUsersLoading ? (
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

const mapStateToProps = (state) => ({
  accountState: state.account,
  userState: state.user,
});

export default connect(mapStateToProps, {
  addUserToAccount,
  getAccount,
  getUsers,
  resetGetUsersState,
  resetSubmitAccountState,
})(AddUserToAccount);
