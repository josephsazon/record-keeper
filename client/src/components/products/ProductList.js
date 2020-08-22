import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

// state
import { getProducts } from '../../state/actions/productActions';

// components
import ProductItem from './ProductItem';

// styles
import './ProductList.css';

const ProductList = ({ product: { products }, getProducts }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    getProducts(1, 10);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const productClassifications = [
      ...new Set(products.map((product) => product.classification)),
    ];

    const groupedProducts = productClassifications.map((classification) => {
      const items = products.filter(
        (product) => product.classification === classification
      );

      return {
        classification,
        items,
      };
    });

    setDisplayedProducts(groupedProducts);
  }, [products]);

  return (
    <div className="product-list">
      {displayedProducts.map(({ classification, items }) => {
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

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(ProductList);
