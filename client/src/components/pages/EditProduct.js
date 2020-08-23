import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import {
  updateProduct,
  clearCurrentProduct,
  updateProductReset,
} from '../../state/actions/productActions';

// components
import M from 'materialize-css/dist/js/materialize.min.js';

// styles
import './EditProduct.css';
import ConfirmModal from '../layout/ConfirmModal';
import Spinner from '../layout/Spinner';

const EditProduct = ({
  productState: { current, loading, updateProductSuccess },
  clearCurrentProduct,
  updateProduct,
  updateProductReset,
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [classification, setClassification] = useState('');

  useEffect(() => {
    M.AutoInit();

    return () => {
      clearCurrentProduct();
      updateProductReset();
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

  const onSubmit = async () => {
    const product = {
      _id: current._id,
      name,
      amount,
      classification,
    };

    if (name && amount && classification) {
      await updateProduct(product);

      M.toast({ html: `Updated '${name}' product` });
    } else {
      M.toast({ html: 'Missing fields' });
    }
  };

  return (
    <div className="edit-product container">
      {updateProductSuccess && <Redirect to="/products" />}
      <ConfirmModal
        title="Confirmation"
        message="Do you want to save this product?"
        onSubmit={onSubmit}
      />
      <div className="edit-product__header page-header">
        <Link to="/products" className="left">
          <i className="material-icons ">arrow_back</i>
        </Link>
        Edit product
      </div>
      <div className="edit-product__content">
        <form className="edit-product__form">
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
            {loading ? (
              <div className="center-align">
                <Spinner />
              </div>
            ) : (
              <a
                href="#confirm-modal"
                className="edit-product__submit-btn btn-large blue lighten-2 waves-effect modal-trigger"
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
  clearCurrentProduct,
  updateProduct,
  updateProductReset,
})(EditProduct);
