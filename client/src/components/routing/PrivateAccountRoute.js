import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import { clearAccountToken } from '../../state/actions/accountActions';

// components
import PrivateRoute from './PrivateRoute';
import { useEffect } from 'react';

const PrivateAccountRoute = ({
  compoenent: Component,
  accountState,
  clearAccountToken,
  ...rest
}) => {
  const { isAccountAuthenticated } = accountState;

  useEffect(() => {
    return () => {
      clearAccountToken();
    };
  }, []);

  return (
    <PrivateRoute
      {...rest}
      render={(props) =>
        isAccountAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/accounts" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  accountState: state.account,
});

export default connect(mapStateToProps, { clearAccountToken })(
  PrivateAccountRoute
);
