import React, { Fragment, useState, useEffect } from 'react';

// components
import { Collapsible } from 'react-materialize';
import Preloader from '../layout/Preloader';
import TransactionItem from './TransactionItem';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  const getTransactions = async () => {
    setLoading(true);

    try {
      const res = await fetch('/transactions');
      const data = await res.json();

      setTransactions(data);
    } catch (err) {}
    setLoading(false);
  };

  if (loading) return <Preloader />;

  return (
    <Collapsible>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </Collapsible>
  );
};

export default TransactionList;
