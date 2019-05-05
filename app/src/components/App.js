
import React, { Fragment } from 'react';
import {
  HashRouter as Router, Route, Switch
} from 'react-router-dom';

import AppPageHeader from './AppPageHeader';
import Home from './Home';

const App = () => (
  <Router>
    <Fragment>
      <AppPageHeader />
      <section className="container">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
