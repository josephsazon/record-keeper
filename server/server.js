const express = require('express');

const app = express();

app.get('/accounts', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Bukid - Daungan',
      balance: 10000,
      updatedBy: 'Joseph Sazon',
      updatedDate: '07-26-2020',
    },
  ]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
