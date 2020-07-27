import React from 'react';
import PropTypes from 'prop-types';

const ConfirmTransactionModal = ({ onSubmit }) => {
  return (
    <div id="confirm-transaction-modal" className="modal">
      <div className="modal-content">
        <h4>Confirmation</h4>
        <p>Do you want to save this transaction?</p>
        <div className="row" style={{ margin: '0' }}>
          <div className="right">
            <button className="btn-flat grey-text modal-close">Cancel</button>
            <button
              className="btn-flat blue-text modal-close"
              onClick={onSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmTransactionModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmTransactionModal;
