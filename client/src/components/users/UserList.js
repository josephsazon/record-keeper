import React from 'react';

// styles
import './UserList.css';

const UserList = ({ onSelectUser, users }) => {
  return (
    <div className="user-list">
      <ul className="collection">
        {users.map((user) => {
          return (
            <li
              key={user._id}
              className="collection-item"
              onClick={() => onSelectUser(user)}
            >
              <i className="material-icons grey-text text-lighten-1">person</i>
              <span>{user.username}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
