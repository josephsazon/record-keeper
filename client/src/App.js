import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// state
import store from './state/store';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import SideNav from './components/layout/Sidenav';
import Accounts from './components/pages/Accounts';
import AddTransactionForm from './components/transactions/AddTransactionForm';
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
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <SideNav />
          <Switch>
            <Route exact path="/" render={() => <span>Home page</span>} />
            <Route exact path="/accounts" component={Accounts} />
            <Route exact path="/transactions" component={Transactions} />
            <Route
              exact
              path="/transactions/add"
              component={AddTransactionForm}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
