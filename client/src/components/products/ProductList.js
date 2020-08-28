import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// state
import {
  getProducts,
  resetGetProducts,
} from '../../state/actions/productActions';

// components
import ProductItem from './ProductItem';
import Spinner from '../layout/Spinner';

// styles
import './ProductList.css';

// utils
import groupProducts from '../../utils/groupProducts';

const ProductList = ({ productState, getProducts, resetGetProducts }) => {
  const {
    getProductsLoading,
    getProductsSuccess,
    hasNextPage,
    page,
    products,
  } = productState;
  const [rawProducts, setRawProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    getProducts(1, 10);

    return () => {
      resetGetProducts();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (getProductsSuccess && products.length) {
      setRawProducts([...rawProducts, ...products]);
    }

    if (getProductsSuccess && hasNextPage) {
      getProducts(page + 1, 10);
    }
    // eslint-disable-next-line
  }, [products]);

  useEffect(() => {
    if (rawProducts.length) {
      setDisplayedProducts(groupProducts(rawProducts));
    }
    // eslint-disable-next-line
  }, [rawProducts]);

  const onLoadMoreClick = () => {
    getProducts(page + 1, 10);
  };

  return (
    <div className="product-list">
      {displayedProducts.length > 0 &&
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
      <div className="product-list__bottom-placeholder">
        {getProductsLoading ? (
          <Spinner />
        ) : (
          hasNextPage && (
            <button className="btn-flat waves-effect" onClick={onLoadMoreClick}>
              Load more
            </button>
          )
        )}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  productState: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  productState: state.product,
});

export default connect(mapStateToProps, {
  getProducts,
  resetGetProducts,
})(ProductList);
