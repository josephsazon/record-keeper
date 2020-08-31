import React from 'react';

// styles
import './CurrentUsers.css';

const CurrentUsers = ({ users }) => {
  return (
    <div className="current-users">
      <div className="current-users__header">Current users</div>
      <ul className="collection">
        <li className="current-users__add-user-block collection-item">
          <i className="material-icons blue-text text-lighten-2">add</i>
          <span>Add user...</span>
        </li>
        {users.map((user) => (
          <li key={user._id} className="collection-item">
            <i className="material-icons grey-text text-lighten-1">person</i>
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentUsers;
