import React from 'react';

import './ProductItem.css';
import NumberFormat from 'react-number-format';

const ProductItem = ({ product }) => {
  const { name, amount } = product;
  return (
    <li className="product-item collection-item">
      <span>{name}</span>
      <span>
        <NumberFormat
          value={amount}
          displayType="text"
          prefix="₱"
          thousandSeparator={true}
        />
      </span>
    </li>
  );
};

export default ProductItem;
