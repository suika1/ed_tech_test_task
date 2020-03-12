import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import React from 'react';
import { Row, Col, Card } from 'antd';
import moment from 'moment';

import s from './styles.sass';

const GET_VIEWER = gql`
  query GET_VIEWER {
    viewer {
      login
    }
  }
`;

const GET_USER_REPOS = gql`
  query GET_USER_REPOS(
    $login: String!
  ) { 
  user(login: $login) {
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
        url
        description
        createdAt
        updatedAt
        pushedAt
        owner {
          id
          login
        }
      }
    }
  }
}
`;

const RepoList = props => {
  const [getUserRepos, userReposQuery] = useLazyQuery(GET_USER_REPOS);

  const viewerQuery = useQuery(GET_VIEWER, {
    onCompleted({ viewer }) {
      if (viewer && viewer.login) {
        getUserRepos({
          variables: {
            login: viewerQuery.data.viewer.login,
          },
        });
      }
    }
  });


  if (viewerQuery.loading || userReposQuery.loading) return (<p>Loading...</p>);
  if (viewerQuery.error || userReposQuery.error) return (<p>Error: {error}</p>);

  return (
    <Col span={20} className={s.wrapper}>
      <p>
        {'logined as '}
        {viewerQuery.data.viewer.login}
      </p>
      {userReposQuery.data && (
        <div className={s.reposWrapper}>
          {userReposQuery.data.user.repositories.nodes.map(repo => (
            <Col className={s.cardWrapper} span={8} key={repo.id}>
              <div className={s.card}>
                <Card title={repo.name} bordered={false} hoverable>
                  <p>
                    {'Description: '}
                    {repo.description}
                  </p>
                  <p>
                    {'Last update: '}
                    {moment(repo.pushedAt).format('DD.MM.YYYY')}
                    {'Diff in days: '}
                    {moment().diff(repo.pushedAt, 'days')}
                  </p>
                </Card>
              </div>
            </Col>
          ))}
        </div>
      )}
    </Col>
  );
};

export default RepoList;
