import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import DonatePage from './views/DonatePage';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/DonatePage"
        />
        <Route
          component={DonatePage}
          exact
          path="/DonatePage"
        />
      
      </Switch>
    );
  }
}
