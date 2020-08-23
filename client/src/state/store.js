import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import authReducer from './reducers/authReducer';

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(
  createStore(
    persistReducer(persistConfig, authReducer),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
);
