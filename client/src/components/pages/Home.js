import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// state
import { getUser, resetGetUserState } from '../../state/actions/userActions';

const Home = ({ userState, getUser, resetGetUserState }) => {
  const { getUserTriggered } = userState;

  useEffect(() => {
    if (!getUserTriggered) getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="page-header">Home</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});

export default connect(mapStateToProps, { getUser, resetGetUserState })(Home);
