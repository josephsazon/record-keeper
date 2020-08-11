import React from 'react';

// styles
import './AccountType.css';

const AccountType = ({ entryType, icon, iconColor, type }) => {
  return (
    <li class="collection-item account-type" onClick={() => console.log(type)}>
      <i
        className={`material-icons ${iconColor || 'grey'}-text text-lighten-1`}
      >
        {icon}
      </i>
      <span className="account-type__text">{type}</span>
      <div className="secondary-content">
        <span class={`${entryType === 'debit' ? 'red-text' : 'green-text'}`}>
          {entryType}
        </span>
      </div>
    </li>
  );
};

export default AccountType;
