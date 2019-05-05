import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { reducer as toastrReducer } from 'react-redux-toastr';

import app from './app';
import movie from './movie';

const todo = combineReducers({
  app,
  movie,
  toastr: toastrReducer,
});

const store = createStore(
  todo,
  applyMiddleware(reduxPromise)
);

export default store;
