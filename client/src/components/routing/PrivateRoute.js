import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import { logout } from '../../state/actions/authActions';

// components
import Preloader from '../layout/Preloader';

const PrivateRoute = ({
  authState,
  userState,
  logout,
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = authState;
  const { getUserLoading, getUserSuccess, getUserTriggered } = userState;

  useEffect(() => {
    if (getUserTriggered) {
      if (!getUserSuccess) logout();
    }
    // eslint-disable-next-line
  }, [getUserTriggered]);

  return (
    <Route
      {...rest}
      render={(props) =>
        getUserLoading && !getUserTriggered ? (
          <Preloader />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  userState: state.user,
});

export default connect(mapStateToProps, { logout })(PrivateRoute);
