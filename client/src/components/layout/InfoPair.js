import React from 'react';

const InfoPair = ({ label, value, col }) => {
  return (
    <div className={`col ${col || 's12'}`} style={{ marginBottom: '15px' }}>
      <div className>
        <strong>{label}</strong>
      </div>
      <div className="grey-text text-darken-1">{value || 'N/A'}</div>
    </div>
  );
};

export default InfoPair;
