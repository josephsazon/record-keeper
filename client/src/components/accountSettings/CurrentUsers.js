import React from 'react';
import { connect } from 'react-redux';

// styles
import './CurrentUsers.css';

const CurrentUsers = ({ accountState, users, onAddUser }) => {
  const { account } = accountState;
  return (
    <div className="current-users">
      <div className="current-users__header">Current users</div>
      <ul className="collection container">
        <li
          className="current-users__add-user-block collection-item"
          onClick={onAddUser}
        >
          <div className="current-users__label">
            <i className="material-icons blue-text text-lighten-2">add</i>
            <span>Add user...</span>
          </div>
        </li>
        {users.map((user) => (
          <li key={user._id} className="collection-item">
            <div className="current-users__label">
              <i className="material-icons grey-text text-lighten-1">person</i>
              <span>{user.username}</span>
            </div>
            {account.createdBy !== user.username && (
              <div>
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
});

export default connect(mapStateToProps)(CurrentUsers);
