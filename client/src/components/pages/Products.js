import React from 'react';
import { Link } from 'react-router-dom';

// components
import ProductList from '../products/ProductList';

// styles
import './Products.css';

const Products = () => {
  return (
    <div className="products container">
      <div className="page-header">
        <Link to="/accounts" className="left">
          <i className="material-icons">arrow_back</i>
        </Link>
        Products
      </div>
      <ProductList />
      <div className="fixed-action-btn">
        <Link to="/products/form" className="btn-floating btn blue lighten-2">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Products;
