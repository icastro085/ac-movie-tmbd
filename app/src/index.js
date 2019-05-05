import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'

import App from './components/App';
import store from './reducers';

import './scss/style.scss';

render(
  <Provider store={store}>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-center"
      transitionIn="bounceIn"
      transitionOut="bounceOut"
      progressBar
      closeOnToastrClick/>

    <App />
  </Provider>,
  document.getElementById('app')
);
