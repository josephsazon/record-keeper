import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// state
import {
  removeUserFromAccount,
  getAccount,
  resetSubmitAccountState,
} from '../../state/actions/accountActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import ConfirmModal from '../layout/ConfirmModal';

// styles
import './CurrentUsers.css';
import Preloader from '../layout/Preloader';

const CurrentUsers = ({
  accountState,
  authState,
  users,
  onAddUser,
  getAccount,
  removeUserFromAccount,
  resetSubmitAccountState,
}) => {
  const {
    account,
    error,
    submitAccountLoading,
    submitAccountSuccess,
    submitAccountTriggered,
  } = accountState;
  const [userToRemove, setUserToRemove] = useState({});

  useEffect(() => {
    return () => {
      resetSubmitAccountState();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (submitAccountTriggered) {
      if (submitAccountSuccess) {
        M.toast({ html: `Removed '${userToRemove.username} from account.'` });
        resetSubmitAccountState();
        getAccount();
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [submitAccountTriggered]);

  const onRemoveUser = () => {
    console.log(userToRemove);
    const payload = { userId: userToRemove._id };

    removeUserFromAccount(payload);
  };

  const onSelectUserToRemove = (user) => {
    setUserToRemove(user);
    const modal = M.Modal.init(
      document.getElementById('confirmRemoveUserFromAccount')
    );

    modal.open();
  };

  return (
    <div className="current-users">
      <ConfirmModal
        id="confirmRemoveUserFromAccount"
        title="Confirmation"
        message={`Do you want to remove '${userToRemove.username}' from account?`}
        onSubmit={onRemoveUser}
      />
      <div className="current-users__header">Current users</div>
      {submitAccountLoading && <Preloader />}
      <ul className="collection container">
        {account.createdBy === authState.user.username && (
          <li
            className="current-users__add-user-block collection-item"
            onClick={onAddUser}
          >
            <div className="current-users__label">
              <i className="material-icons blue-text text-lighten-2">add</i>
              <span>Add user...</span>
            </div>
          </li>
        )}
        {users.map((user) => (
          <li key={user._id} className="collection-item">
            <div className="current-users__label">
              <i className="material-icons grey-text text-lighten-1">person</i>
              <span>{user.username}</span>
            </div>
            {account.createdBy !== user.username &&
              account.createdBy === authState.user.username && (
                <div onClick={() => onSelectUserToRemove(user)}>
                  <i className="material-icons grey-text text-lighten-1">
                    delete
                  </i>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountState: state.account,
  authState: state.auth,
});

export default connect(mapStateToProps, {
  getAccount,
  removeUserFromAccount,
  resetSubmitAccountState,
})(CurrentUsers);
