import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Repo from 'modules/repo';
import RepoList from 'modules/repoList';
import { history } from 'api/history';
import { apolloClient } from 'api/apolloClient';

const routes = [{
  url: '/repos',
  exact: true,
  render: () => (
    <RepoList />
  ),
}, {
  url: '/repo/:name',
  exact: true,
  render: () => (
    <Repo />
  ),
}];

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <Switch>
        {routes.map(props => (
          <Route
            key={props.url}
            path={props.url}
            exact={props.exact}
            render={props.render}
          />
        ))}

        <Route
          render={() => (
            <Redirect to={routes[0].url} />
          )}
        />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
