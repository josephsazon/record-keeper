const express = require('express');

const getAccounts = (req, res, next) => {
  res.json([
    {
      id: 1,
      name: 'Bukid - Daungan',
      balance: 10000,
      updatedBy: 'Joseph Sazon',
      updatedDate: '07-26-2020',
    },
  ]);
};

module.exports = {
  getAccounts,
};
