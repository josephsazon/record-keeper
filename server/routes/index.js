const apiRoute = require('./apis');

const init = (server) => {
  server.all('*', (req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);

    return next();
  });

  server.use('/api', apiRoute);
};

module.exports = {
  init,
};
