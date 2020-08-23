import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import {
  addProduct,
  clearCurrentProduct,
  resetSubmitProduct,
  updateProduct,
} from '../../state/actions/productActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import ConfirmModal from '../layout/ConfirmModal';
import Spinner from '../layout/Spinner';

// styles
import './ProductForm.css';

const ProductForm = ({
  productState,
  addProduct,
  clearCurrentProduct,
  resetSubmitProduct,
  updateProduct,
}) => {
  const {
    current,
    error,
    submitProductLoading,
    submitProductSuccess,
    submitProductTriggered,
  } = productState;
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [classification, setClassification] = useState('');

  useEffect(() => {
    M.AutoInit();

    return () => {
      resetSubmitProduct();
      clearCurrentProduct();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (current) {
      setName(current.name);
      setAmount(current.amount);
      setClassification(current.classification);
    }
    // eslint-disable-next-line
  }, [current]);

  useEffect(() => {
    if (submitProductTriggered) {
      if (submitProductSuccess) {
        M.toast({ html: `${current ? 'Updated' : 'Added'} '${name}' product` });
      } else {
        M.toast({ html: error });
      }
    }
    // eslint-disable-next-line
  }, [submitProductTriggered]);

  const onSubmit = () => {
    const product = {
      _id: current ? current._id : null,
      name,
      amount,
      classification,
    };

    if (name && amount && classification) {
      if (current) {
        updateProduct(product);
      } else {
        delete product._id;
        addProduct(product);
      }
    } else {
      M.toast({ html: 'Missing fields' });
    }
  };

  return (
    <div className="product-form container">
      {submitProductSuccess && <Redirect to="/products" />}
      <ConfirmModal
        title="Confirmation"
        message="Do you want to save this product?"
        onSubmit={onSubmit}
      />
      <div className="product-form__header page-header">
        <Link to="/products" className="left">
          <i className="material-icons ">arrow_back</i>
        </Link>
        {`${current ? 'Edit' : 'Add'} product`}
      </div>
      <div className="product-form__content">
        <form>
          <div className="input-field">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name" className="active">
              Name
            </label>
          </div>

          <div className="input-field">
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="amount" className="active">
              Amount
            </label>
          </div>

          <div className="input-field">
            <input
              type="text"
              id="classification"
              name="classification"
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
            />
            <label htmlFor="classification" className="active">
              Classification
            </label>
          </div>
        </form>
        <div className="row">
          <div className="col s12 m3 right">
            {submitProductLoading ? (
              <div className="center-align">
                <Spinner />
              </div>
            ) : (
              <a
                href="#confirm-modal"
                className="product-form__submit-btn btn-large blue lighten-2 waves-effect modal-trigger"
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
  productState: state.product,
});

export default connect(mapStateToProps, {
  addProduct,
  clearCurrentProduct,
  updateProduct,
  resetSubmitProduct,
})(ProductForm);
