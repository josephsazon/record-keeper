import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';

// state
import { requestAccountToken } from '../../state/actions/accountActions';
import Preloader from '../layout/Preloader';

const AccountItem = ({
  account,
  history,
  accountState,
  requestAccountToken,
}) => {
  const { name, balance, updatedDate, updatedBy } = account;

  const accessAccount = (path) => {
    requestAccountToken(account._id).then(() => {
      history.push(path);
    });
  };

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">{name}</span>
        {/* {accountState.getAccountLoading && <Preloader />} */}
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
              onClick={() => accessAccount('/transactions')}
              className="waves-effect"
            >
              <span className="blue-text">Transactions</span>
            </a>
          </div>
          <div className="col">
            <a
              onClick={() => accessAccount('/transactions')}
              className="waves-effect"
            >
              <span className="blue-text">Pricelist</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accountState: state.account,
});

export default connect(mapStateToProps, { requestAccountToken })(AccountItem);
