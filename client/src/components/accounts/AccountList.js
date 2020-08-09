import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import { getAccounts } from '../../state/actions/accountActions';

// components
import AccountItem from './AccountItem';
import Preloader from '../layout/Preloader';

const AccountList = ({
  account: { accounts, loading },
  getAccounts,
  history,
}) => {
  useEffect(() => {
    getAccounts();
  }, []);

  if (loading) return <Preloader />;

  return (
    <Fragment>
      <div className="row">
        {accounts &&
          accounts.map((account) => (
            <div className="col s12 m6 l4" key={account._id}>
              <AccountItem account={account} history={history} />
            </div>
          ))}
      </div>
    </Fragment>
  );
};

AccountList.propTypes = {
  account: PropTypes.object.isRequired,
  getAccounts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { getAccounts })(AccountList);
