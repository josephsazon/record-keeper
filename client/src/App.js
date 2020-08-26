import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// state
import { store, persistor } from './state/store';

// pages
import Accounts from './components/pages/Accounts';
import AccountSettings from './components/accounts/AccountSettings';
import AddTransactionForm from './components/transactions/AddTransactionForm';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Products from './components/pages/Products';
import ProductForm from './components/pages/ProductForm';
import Transactions from './components/pages/Transactions';
import TransactionTypeForm from './components/pages/TransactionTypeForm';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import SideNav from './components/layout/Sidenav';
import PrivateRoute from './components/routing/PrivateRoute';

// styles
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

// utils
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Fragment>
            <Navbar />
            <SideNav />
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/accounts" component={Accounts} />
              <PrivateRoute
                exact
                path="/account/settings"
                component={AccountSettings}
              />
              <PrivateRoute
                exact
                path="/account/settings/transaction-type/form"
                component={TransactionTypeForm}
              />
              <PrivateRoute exact path="/products" component={Products} />
              <PrivateRoute
                exact
                path="/products/form"
                component={ProductForm}
              />
              <PrivateRoute
                exact
                path="/transactions"
                component={Transactions}
              />
              <PrivateRoute
                exact
                path="/transactions/add"
                component={AddTransactionForm}
              />
            </Switch>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
