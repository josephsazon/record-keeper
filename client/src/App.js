import React, { useEffect, Fragment } from 'react';

// components
import M from 'materialize-css/dist/js/materialize.min.js';

// styles
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  return <Fragment>My App</Fragment>;
};

export default App;
