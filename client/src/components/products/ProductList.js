import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import { clearProducts, getProducts } from '../../state/actions/productActions';

// components
import ProductItem from './ProductItem';

// styles
import './ProductList.css';

// utils
import groupProducts from '../../utils/groupProducts';

const ProductList = ({
  product: { getProductsSuccess, products },
  getProducts,
  clearProducts,
}) => {
  const [rawProducts, setRawProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    getProducts(1, 10);

    return () => {
      clearProducts();
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (getProductsSuccess && products.length > 0) {
      setRawProducts([...rawProducts, ...products]);
      setDisplayedProducts(groupProducts([...rawProducts, ...products]));
    }
  }, [products]);

  return (
    <div className="product-list">
      {getProductsSuccess &&
        displayedProducts.length > 0 &&
        displayedProducts.map(({ classification, items }) => {
          return (
            <Fragment key={classification}>
              <h6 className="product-list__classification">{classification}</h6>

              <ul className="collection">
                {items.map((item) => (
                  <ProductItem key={item._id} product={item} />
                ))}
              </ul>
            </Fragment>
          );
        })}
    </div>
  );
};

ProductList.propTypes = {
  product: PropTypes.object.isRequired,
  clearProducts: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { clearProducts, getProducts })(
  ProductList
);
