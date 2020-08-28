import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';

// state
import {
  getAccount,
  requestAccountToken,
} from '../../state/actions/accountActions';

const AccountItem = ({ account, history, getAccount, requestAccountToken }) => {
  const { name, balance, updatedDate, updatedBy } = account;

  const accessAccount = (path) => {
    requestAccountToken(account._id).then(() => {
      getAccount().then(() => history.push(path));
    });
  };

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">{name}</span>
        <div className="row">
          <div className="col s12">
            <div className="col s6">
              <strong>Balance</strong>
            </div>
            <div className="col s6">
              <NumberFormat
                value={balance}
                displayType="text"
                thousandSeparator={true}
                prefix="₱"
              />
            </div>
          </div>

          <div className="col s12">
            <div className="col s6">
              <strong>Updated by</strong>
            </div>
            <div className="col s6">{updatedBy}</div>
          </div>

          <div className="col s12">
            <div className="col s6">
              <strong>Updated date</strong>
            </div>
            <div className="col s6">
              <Moment calendar>{updatedDate}</Moment>
            </div>
          </div>
        </div>
        <button
          className="btn-floating right waves-effect white"
          onClick={() => accessAccount('/account/settings')}
        >
          <i className="material-icons grey-text">settings</i>
        </button>
      </div>
      <div className="card-action">
        <div className="row" style={{ marginBottom: '0' }}>
          <div className="col">
            <a
              href="#!"
              onClick={() => accessAccount('/transactions')}
              className="waves-effect"
            >
              <span className="blue-text">Transactions</span>
            </a>
          </div>
          <div className="col">
            <a
              href="#!"
              onClick={() => accessAccount('/products')}
              className="waves-effect"
            >
              <span className="blue-text">Products</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { requestAccountToken, getAccount })(AccountItem);
