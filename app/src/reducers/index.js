import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

import app from './app';

const todo = combineReducers({
  app,
});

const store = createStore(
  todo,
  applyMiddleware(reduxPromise)
);

export default store;
