import React from 'react';
import PropTypes from 'prop-types';

const ConfirmModal = ({ id, title, message, onSubmit }) => {
  return (
    <div id={id} className="modal">
      <div className="modal-content">
        <h4>{title}</h4>
        <p>{message}</p>
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

ConfirmModal.propTypes = {
  message: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ConfirmModal;
