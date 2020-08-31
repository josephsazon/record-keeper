import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// state
import { getUsers, resetGetUsersState } from '../../state/actions/userActions';
import { useEffect } from 'react';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import Spinner from '../layout/Spinner';

const UserList = ({ userState, getUsers, resetGetUsersState }) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsers(1, 10);

    return () => {
      resetGetUsersState();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (getAllUsersTriggered && getAllUsersSuccess) {
      if (getAllUsersSuccess) {
        setAllUsers([...allUsers, users]);
      } else {
        M.toast({ html: error });
      }
    }
  }, [getAllUsersTriggered]);

  const onLoadMoreClick = () => {
    getUsers(page + 1, 10);
  };

  const {
    error,
    getAllUsersLoading,
    getAllUsersSuccess,
    getAllUsersTriggered,
    hasNextPage,
    page,
    users,
  } = userState;
  return (
    <div className="user-list">
      {getAllUsersTriggered && !hasNextPage && (
        <ul className="collection">
          {allUsers.map(({ username }) => {
            return <li key={user._id}>{username}</li>;
          })}
        </ul>
      )}
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
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});

export default connect(mapStateToProps, { getUsers, resetGetUsersState })(
  UserList
);
