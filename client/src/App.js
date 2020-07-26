import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import SideNav from './components/layout/Sidenav';
import Accounts from './components/pages/Accounts';
import Transactions from './components/pages/Transactions';

// styles
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  return (
    <Router>
      <Fragment>
        <Navbar />
        <SideNav />
        <Switch>
          <div className="container">
            <Route exact path="/" render={() => <span>Home page</span>} />
            <Route exact path="/accounts" component={Accounts} />
            <Route exact path="/transactions" component={Transactions} />
          </div>
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
