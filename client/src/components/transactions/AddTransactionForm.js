import React, { useEffect } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';

const AddTransactionForm = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="container">
      <h4 className="center">
        <Link to="/transactions" className="left">
          <i className="material-icons ">arrow_back</i>
        </Link>
        <span>Add Transaction</span>
      </h4>
      <div className="row">
        <form className="col s12">
          <div className="input-field col s12">
            <input type="text" id="name" name="name" />
            <label htmlFor="name">Name</label>
          </div>

          <div className="input-field col s12">
            <textarea
              id="description"
              className="materialize-textarea"
              name="description"
            />
            <label htmlFor="description">Description</label>
          </div>

          <div className="input-field col s12">
            <input type="number" id="amount" name="amount" />
            <label htmlFor="amount">Amount</label>
          </div>

          <div className="input-field col s12">
            <select name="worker" id="worker" defaultValue="">
              <option>N/A</option>
              <option>Ricky</option>
              <option>Sindak</option>
            </select>
            <label htmlFor="worker">Worker</label>
          </div>

          <div className="input-field col s12">
            <select name="type" id="type" defaultValue="">
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
                href="#confirm-transaction"
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
