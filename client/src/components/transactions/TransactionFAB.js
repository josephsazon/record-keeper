import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import M from 'materialize-css/dist/js/materialize.min.js';

const TransactionFAB = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    // <div>
    <div className="fixed-action-btn horizontal click-to-toggle">
      <Link
        to="/transactions/add"
        className="btn-floating btn-large green darken-2"
      >
        <i className="material-icons">attach_money</i>
      </Link>
      {/* <a className="btn-floating btn-large">
        <i className="material-icons">mode_edit</i>
      </a> */}
      {/* <ul>
        <li>
          <Link to="/transactions/add" className="btn-floating green darken-2">
            <i className="material-icons">attach_money</i>
          </Link>
        </li>
        <li>
          <a className="btn-floating blue">
            <i className="material-icons">person</i>
          </a>
        </li>
        <li>
          <a className="btn-floating red">
            <i className="material-icons">person_add</i>
          </a>
        </li>
      </ul> */}
      {/* </div> */}
    </div>
  );
};

export default TransactionFAB;
