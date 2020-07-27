import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import ConfirmTransactionModal from './ConfirmTransactionModal';

const AddTransactionForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [worker, setWorker] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    M.AutoInit();
  }, []);

  const onSubmit = () => {
    const transaction = {
      name,
      description,
      amount,
      worker,
      type,
    };

    console.log(transaction);
  };

  return (
    <div className="container">
      <ConfirmTransactionModal onSubmit={onSubmit} />
      <h4 className="center">
        <Link to="/transactions" className="left">
          <i className="material-icons ">arrow_back</i>
        </Link>
        <span>Add Transaction</span>
      </h4>
      <div className="row">
        <form className="col s12">
          <div className="input-field col s12">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>

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
            <select
              name="worker"
              id="worker"
              defaultValue=""
              value={worker}
              onChange={(e) => setWorker(e.target.value)}
            >
              <option>N/A</option>
              <option>Ricky</option>
              <option>Sindak</option>
            </select>
            <label htmlFor="worker">Worker</label>
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
              <option>Adjustment</option>
              <option>Inflow</option>
              <option>Labor</option>
              <option>Materials</option>
              <option>Others</option>
            </select>
            <label htmlFor="worker">Type</label>
          </div>

          <div className="col s12">
            <div className="col s12 m3 right">
              <a
                href="#confirm-transaction-modal"
                className="btn-large blue lighten-2 modal-trigger"
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

export default AddTransactionForm;
