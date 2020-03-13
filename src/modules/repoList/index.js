import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Row, Col } from 'antd';

import s from './styles.sass';
import { TIMEOUT } from './constants';
import { RepoCard } from './repoCard';

const GET_USER_REPOS = gql`
  query GET_USER_REPOS {
    viewer {
      login
      repositories(
        first: 100
        affiliations: OWNER
        ownerAffiliations: OWNER
        privacy: PUBLIC
        isFork: false
      ) {
        totalCount
        nodes {
          id
          name
          description
          pushedAt
        }
      }
    }
  }
`;

const RepoList = props => {
  const userReposQuery = useQuery(GET_USER_REPOS, {
    pollInterval: TIMEOUT,
  });

  if (userReposQuery.loading) return (<p>Loading...</p>);
  if (userReposQuery.error) {
    return (
      <p>
        {'Error: '}
        {userReposQuery.error.message}
      </p>
    );
  }

  return (
    <Col span={20} className={s.wrapper}>
      <p className={s.loginedAs}>
        {'logined as '}
        {userReposQuery.data.viewer.login}
      </p>
      {userReposQuery.data && (
        <div className={s.reposWrapper}>
          {userReposQuery.data.viewer.repositories.nodes.map(repo => (
            <RepoCard
              key={`${repo.id}`}
              repo={repo}
            />
          ))}
        </div>
      )}
    </Col>
  );
};

export default RepoList;
