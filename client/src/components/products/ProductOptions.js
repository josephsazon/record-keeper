import React, { useEffect, useState, Fragment } from 'react';
import groupProducts from '../../utils/groupProducts';

const ProductOptions = ({ products, productOptionsRendered }) => {
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    setGroupedProducts(groupProducts(products));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    productOptionsRendered();
    // eslint-disable-next-line
  }, [groupedProducts]);

  return (
    <Fragment>
      {groupedProducts &&
        groupedProducts.map(({ classification, items }) => {
          return (
            <optgroup key={classification} label={classification}>
              {items.map(({ name }) => (
                <option key={name}>{name}</option>
              ))}
            </optgroup>
          );
        })}
    </Fragment>
  );
};

export default ProductOptions;
