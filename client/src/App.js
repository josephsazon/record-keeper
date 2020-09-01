import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// state
import { store, persistor } from './state/store';

// pages
import Accounts from './components/pages/Accounts';
import AccountForm from './components/pages/AccountForm';
import AccountSettings from './components/accounts/AccountSettings';
import AddUserToAccount from './components/accountSettings/AddUserToAccount';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Products from './components/pages/Products';
import ProductForm from './components/pages/ProductForm';
import Transactions from './components/pages/Transactions';
import TransactionForm from './components/pages/TransactionForm';
import TransactionTypeForm from './components/pages/TransactionTypeForm';
import UserProfile from './components/pages/UserProfile';

// components
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import SideNav from './components/layout/Sidenav';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateAccountRoute from './components/routing/PrivateAccountRoute';

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
                path="/account/form"
                component={AccountForm}
              />
              <PrivateRoute
                exact
                path="/user/profile"
                component={UserProfile}
              />
              <PrivateAccountRoute
                exact
                path="/account/settings"
                component={AccountSettings}
              />
              <PrivateAccountRoute
                exact
                path="/account/settings/transaction-type/form"
                component={TransactionTypeForm}
              />
              <PrivateAccountRoute
                exact
                path="/account/settings/add-user"
                component={AddUserToAccount}
              />
              <PrivateAccountRoute
                exact
                path="/products"
                component={Products}
              />
              <PrivateAccountRoute
                exact
                path="/products/form"
                component={ProductForm}
              />
              <PrivateAccountRoute
                exact
                path="/transactions"
                component={Transactions}
              />
              <PrivateAccountRoute
                exact
                path="/transactions/form"
                component={TransactionForm}
              />
            </Switch>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
