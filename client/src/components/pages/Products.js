import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// state
import { clearAccountToken } from '../../state/actions/accountActions';

// components
import ProductList from '../products/ProductList';

const Products = ({ clearAccountToken }) => {
  return (
    <div className="products container">
      <div className="page-header">
        <Link
          to="/accounts"
          className="left"
          onClick={() => clearAccountToken()}
        >
          <i className="material-icons">arrow_back</i>
        </Link>
        Products
      </div>
      <ProductList />
    </div>
  );
};

export default connect(null, { clearAccountToken })(Products);
