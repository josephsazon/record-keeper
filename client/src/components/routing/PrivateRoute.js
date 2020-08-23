import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import { loadUser } from '../../state/actions/authActions';

// components
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  auth: { isAuthenticated, loading },
  component: Component,
  loadUser,
  ...rest
}) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
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
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);
