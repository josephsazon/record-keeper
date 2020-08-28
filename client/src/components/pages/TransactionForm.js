import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import { getAccount } from '../../state/actions/accountActions';
import {
  addTransaction,
  resetSubmitTransactionState,
} from '../../state/actions/transactionActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import ConfirmModal from '../layout/ConfirmModal';
import Spinner from '../layout/Spinner';

// styles
import './TransactionForm.css';

const TransactionForm = ({
  transactionState,
  addTransaction,
  getAccount,
  resetSubmitTransactionState,
}) => {
  const {
    error,
    submitTransactionLoading,
    submitTransactionSuccess,
    submitTransactionTriggered,
  } = transactionState;
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (submitTransactionTriggered) {
      if (submitTransactionSuccess) {
        M.toast({ html: 'Added transaction' });
        resetSubmitTransactionState();
        getAccount();
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [submitTransactionTriggered]);

  const onSubmit = () => {
    const transaction = {
      amount,
      assignedTo,
      description,
      entryType: type === 'inflow' ? 'credit' : 'debit',
      type,
    };

    if (amount && type) {
      addTransaction(transaction);
    } else {
      M.toast({ html: 'Missing fields' });
    }
  };

  return (
    <div className="transaction-form container">
      {submitTransactionSuccess && <Redirect to="/transactions" />}
      <ConfirmModal
        id="confirmAddTransactionModal"
        title="Confirmation"
        message="Do you want to save this transaction?"
        onSubmit={onSubmit}
      />
      <div className="page-header">
        <Link to="/transactions" className="left">
          <i className="material-icons ">arrow_back</i>
        </Link>
        <span>Add Transaction</span>
      </div>
      <div className="transaction-form__content">
        <form>
          <div className="input-field">
            <select
              name="type"
              id="type"
              defaultValue=""
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="inflow">Inflow</option>
              <option value="labor">Labor</option>
              <option value="materials">Materials</option>
              <option value="others">Others</option>
            </select>
            <label htmlFor="type">Type</label>
          </div>

          <div className="input-field">
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="amount">Amount</label>
          </div>

          <div className="input-field">
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
            <label htmlFor="assignedTo">Assigned to</label>
          </div>

          <div className="input-field">
            <textarea
              id="description"
              className="materialize-textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="description">Description</label>
          </div>
        </form>
        <div className="row">
          <div className="col s12 m3 right">
            {submitTransactionLoading ? (
              <div className="center-align">
                <Spinner />
              </div>
            ) : (
              <a
                href="#confirmAddTransactionModal"
                className="transaction-form__submit-btn btn-large blue lighten-2 modal-trigger waves-effect"
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

const mapStateToProps = (state) => ({
  transactionState: state.transaction,
});

export default connect(mapStateToProps, {
  addTransaction,
  getAccount,
  resetSubmitTransactionState,
})(TransactionForm);
