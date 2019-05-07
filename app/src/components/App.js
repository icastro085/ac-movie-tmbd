
import React, { Fragment } from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';

import AppPageHeader from './AppPageHeader';
import Home from './Home';
import Details from './Details';

const App = () => (
  <Router>
    <Fragment>
      <AppPageHeader />
      <section className="container">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/upcoming" />} />
          <Route exact path="/upcoming" component={Home} />
          <Route exact path="/search" component={Home} />
          <Route exact path="/movie/:idMovie" component={Details} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
