import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

import app from './app';
import movie from './movie';

const todo = combineReducers({
  app,
  movie,
});

const store = createStore(
  todo,
  applyMiddleware(reduxPromise)
);

export default store;
