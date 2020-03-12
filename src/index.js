import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GITHUB_API_KEY } from '../env_variables';
import RepoList from './repoList';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${GITHUB_API_KEY}`,
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <RepoList />
  </ApolloProvider>,
  document.getElementById('root'),
);
