import React from 'react';

const InfoPair = ({ label, value, col }) => {
  return (
    <div className={`col ${col || 's12'}`} style={{ marginBottom: '15px' }}>
      <div>
        <strong>{label}</strong>
      </div>
      <div>{value || 'N/A'}</div>
    </div>
  );
};

export default InfoPair;
