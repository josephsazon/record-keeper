import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import ConfirmModal from '../layout/ConfirmModal';

const AddTransactionForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('git p');
  const [worker, setWorker] = useState('');
  const [type, setType] = useState('');

  const [success, setSuccess] = useState(false);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState({});

  useEffect(() => {
    M.AutoInit();
    getAccount(1);
  }, []);

  const addTransaction = async (transaction) => {
    setSuccess(false);
    try {
      const res = await fetch('/transactions', {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      updateAccountBalance(1);

      setSuccess(true);
    } catch (err) {}
  };

  const getAccount = async (id) => {
    try {
      const res = await fetch(`/accounts?_q=${id}`);
      const data = await res.json();

      setBalance(data[0].balance);
      setAccount(data[0]);
    } catch (err) {}
  };

  const updateAccountBalance = async (id) => {
    try {
      await fetch(`/accounts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...account,
          updatedDate: new Date(),
          balance: type === 'inflow' ? +balance + +amount : balance - amount,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {}
  };

  const onSubmit = () => {
    const transaction = {
      description,
      amount,
      worker,
      type,
      balance: type === 'inflow' ? +balance + +amount : balance - amount,
      createdBy: 'Joseph Sazon',
      date: new Date(),
      entryType: type === 'inflow' ? 'credit' : 'debit',
    };

    if (amount && type && description) {
      addTransaction(transaction);
    } else {
      M.toast({ html: 'Missing fields' });
    }
  };

  return (
    <div className="container">
      {success && <Redirect to="/transactions" />}
      <ConfirmModal
        title="Confirmation"
        message="Do you want to save this transaction?"
        onSubmit={onSubmit}
      />
      <h4 className="center">
        <Link to="/transactions" className="left">
          <i className="material-icons ">arrow_back</i>
        </Link>
        <span>Add Transaction</span>
      </h4>
      <div className="row">
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
            <select
              name="worker"
              id="worker"
              defaultValue=""
              value={worker}
              onChange={(e) => setWorker(e.target.value)}
            >
              <option value="">N/A</option>
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
              <option value="inflow">Inflow</option>
              <option>Labor</option>
              <option>Materials</option>
              <option>Others</option>
            </select>
            <label htmlFor="worker">Type</label>
          </div>

          <div className="col s12">
            <div className="col s12 m3 right">
              <a
                href="#confirm-modal"
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
