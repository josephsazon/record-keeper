import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import { addTransaction } from '../../state/actions/transactionActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import ConfirmModal from '../layout/ConfirmModal';

const AddTransactionForm = ({
  transaction: { addTransactionSuccess },
  addTransaction,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    M.AutoInit();
  }, []);

  const onSubmit = () => {
    const transaction = {
      amount,
      assignedTo,
      description,
      entryType: type === 'inflow' ? 'credit' : 'debit',
      type,
    };
    console.log(transaction);

    if (amount && type && description) {
      addTransaction(transaction);
    } else {
      M.toast({ html: 'Missing fields' });
    }
  };

  return (
    <div className="container">
      {addTransactionSuccess && <Redirect to="/transactions" />}
      <ConfirmModal
        title="Confirmation"
        message="Do you want to save this transaction?"
        onSubmit={onSubmit}
      />
      <h4 className="center">
        <Link to="/5f28274568879d399c29bd90/transactions" className="left">
          <i className="material-icons ">arrow_back</i>
        </Link>
        <span>Add Transaction</span>
      </h4>
      <div className="row" style={{ maxWidth: '750px' }}>
        <form className="col s12">
          <div className="input-field col s12">
            <textarea
              id="description"
              className="materialize-textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="description">Description</label>
          </div>

          <div className="input-field col s12">
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="amount">Amount</label>
          </div>

          <div className="input-field col s12">
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
            <label htmlFor="assignedTo">Assigned to</label>
          </div>

          <div className="input-field col s12">
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

          <div className="col s12">
            <div className="col s12 m3 right">
              <a
                href="#confirm-modal"
                className="btn-large blue lighten-2 modal-trigger waves-effect"
                style={{ display: 'block' }}
              >
                Submit
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps, { addTransaction })(AddTransactionForm);
