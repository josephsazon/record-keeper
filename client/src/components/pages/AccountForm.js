import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import {
  addAccount,
  resetSubmitAccountState,
} from '../../state/actions/accountActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import Spinner from '../layout/Spinner';
import ConfirmModal from '../layout/ConfirmModal';

// styles
import './AccountForm.css';

const AccountForm = ({ accountState, addAccount, resetSubmitAccountState }) => {
  const {
    error,
    submitAccountLoading,
    submitAccountSuccess,
    submitAccountTriggered,
  } = accountState;
  const [name, setName] = useState('');

  useEffect(() => {
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (submitAccountTriggered) {
      if (submitAccountSuccess) {
        M.toast({ html: `Added '${name}' account` });
        resetSubmitAccountState();
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [submitAccountTriggered]);

  const onSubmit = () => {
    if (name) {
      addAccount({ name });
    } else {
      M.toast({ html: 'Missing fields' });
    }
  };

  return (
    <div className="account-form container">
      {submitAccountSuccess && <Redirect to="/accounts" />}
      <ConfirmModal
        id="confirmAddAccountModal"
        title="Confirmation"
        message="Do you want to submit this account?"
        onSubmit={onSubmit}
      />
      <div className="account-form__header page-header">
        <Link to="/accounts" className="left">
          <i className="material-icons">arrow_back</i>
        </Link>
        {`Add account`}
      </div>
      <div className="account-form__content">
        <form>
          <div className="input-field">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Account name</label>
          </div>
        </form>
        <div className="row">
          <div className="col s12 m3 right">
            {submitAccountLoading ? (
              <Spinner />
            ) : (
              <a
                href="#confirmAddAccountModal"
                className="account-form__submit-btn btn-large blue lighten-2 modal-trigger waves-effect"
              >
                Submit
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ accountState: state.account });

export default connect(mapStateToProps, {
  addAccount,
  resetSubmitAccountState,
})(AccountForm);
