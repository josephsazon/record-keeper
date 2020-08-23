import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

// state
import { setCurrentProduct } from '../../state/actions/productActions';

// styles
import './ProductItem.css';

const ProductItem = ({ product, setCurrentProduct }) => {
  const { name, amount } = product;

  const onClick = () => {
    setCurrentProduct(product);
  };

  return (
    <li className="collection-item">
      <Link to="/products/form" onClick={onClick}>
        <div className="product-item ">
          <span>{name}</span>
          <span>
            <NumberFormat
              value={amount}
              displayType="text"
              prefix="₱"
              thousandSeparator={true}
            />
          </span>
        </div>
      </Link>
    </li>
  );
};

export default connect(null, { setCurrentProduct })(ProductItem);
