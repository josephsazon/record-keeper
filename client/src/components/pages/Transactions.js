import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Transactions = () => {
  return (
    <Fragment>
      <h4 className="center">
        <Link to="/accounts" className="left">
          <i className="material-icons ">arrow_back</i>
        </Link>
        <span>Transactions</span>
      </h4>
    </Fragment>
  );
};

export default Transactions;
