import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';

// state
import { getAccount } from '../../state/actions/accountActions';
import {
  addTransactionType,
  clearCurrentTransactionType,
  deleteTransactionType,
  resetSubmitTransactionType,
  updateTransactionType,
} from '../../state/actions/transactionTypeActions';

// components
import ConfirmModal from '../layout/ConfirmModal';
import Spinner from '../layout/Spinner';

// styles
import './TransactionTypeForm.css';

const TransactionTypeForm = ({
  transactionTypeState,
  addTransactionType,
  clearCurrentTransactionType,
  deleteTransactionType,
  getAccount,
  resetSubmitTransactionType,
  updateTransactionType,
}) => {
  const {
    current,
    error,
    submitTransactionTypeLoading,
    submitTransactionTypeSuccess,
    submitTransactionTypeTriggered,
  } = transactionTypeState;
  const [name, setName] = useState('');
  const [entryType, setEntryType] = useState(current ? current.entryType : '');
  const [icon, setIcon] = useState('attach_money');
  const [isLinkedToProducts, setIsLinkedToProducts] = useState(false);
  const [action, setAction] = useState('');

  useEffect(() => {
    M.AutoInit();

    if (current) {
      setName(current.name);
      setIcon(current.icon);
      setIsLinkedToProducts(current.isLinkedToProducts);
    }

    return () => {
      clearCurrentTransactionType();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (submitTransactionTypeTriggered) {
      if (submitTransactionTypeSuccess) {
        M.toast({ html: `${action} '${name}'` });
        resetSubmitTransactionType();
        getAccount();
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [submitTransactionTypeTriggered]);

  const onDelete = () => {
    deleteTransactionType(current._id);
    setAction('Deleted');
  };

  const onSubmit = () => {
    const payload = {
      _id: current ? current._id : null,
      name,
      entryType,
      icon,
      isLinkedToProducts,
    };

    if (name && entryType && icon) {
      if (current) {
        updateTransactionType(payload);
        setAction('Updated');
      } else {
        addTransactionType(payload);
        setAction('Added');
      }
    } else {
      M.toast({ html: 'Missing fields' });
    }
  };

  return (
    <div className="transaction-type-form container">
      {submitTransactionTypeSuccess && <Redirect to="/account/settings" />}
      <ConfirmModal
        id="confirmSaveTransactionTypeModal"
        title="Confirmation"
        message="Do you want to save this transaction type?"
        onSubmit={onSubmit}
      />
      <ConfirmModal
        id="confirmDeleteTransactionTypeModal"
        title="Confirmation"
        message="Do you want to delete this transaction type?"
        onSubmit={onDelete}
      />
      <div className="transaction-type-form__header page-header">
        <Link to="/account/settings" className="left">
          <i className="material-icons">arrow_back</i>
        </Link>
        {`${current ? 'Edit' : 'Add'} transaction type`}
        {current && (
          <a
            href="#confirmDeleteTransactionTypeModal"
            className="modal-trigger right"
          >
            <i className="material-icons grey-text">delete</i>
          </a>
        )}
      </div>
      <div className="transaction-type-form__content">
        <form>
          <div className="input-field">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name" className={current ? 'active' : ''}>
              Name
            </label>
          </div>

          <div className="input-field">
            <select
              name="entryType"
              id="entryType"
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
            <label htmlFor="entryType">Entry type</label>
          </div>

          <div className="input-field">
            <i className="material-icons prefix grey-text">{icon}</i>
            <input
              type="text"
              id="icon"
              name="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
            <label htmlFor="icon" className="active">
              Icon
            </label>
            <a
              className="right"
              target="_blank"
              rel="noopener noreferrer"
              href="https://materializecss.com/icons.html"
            >
              See here for icon choices
            </a>
          </div>
          <div className="input-field">
            <label htmlFor="isLinkedToProducts">
              <input
                type="checkbox"
                id="isLinkedToProducts"
                name="isLinkedToProducts"
                checked={isLinkedToProducts}
                onChange={(e) => setIsLinkedToProducts(e.target.checked)}
              />
              <span>Linked to products</span>
            </label>
          </div>
        </form>
        <div className="row">
          <div className="col s12 m3 right">
            {submitTransactionTypeLoading ? (
              <Spinner />
            ) : (
              <a
                href="#confirmSaveTransactionTypeModal"
                className="transaction-type-form__submit-btn btn-large blue lighten-2 waves-effect modal-trigger"
              >
                Save
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  transactionTypeState: state.transactionType,
});

export default connect(mapStateToProps, {
  addTransactionType,
  clearCurrentTransactionType,
  deleteTransactionType,
  getAccount,
  resetSubmitTransactionType,
  updateTransactionType,
})(TransactionTypeForm);
