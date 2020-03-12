import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import React from 'react';
import { Row, Col } from 'antd';

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
    <div>
      <p>
        {'login is: '}
        {JSON.stringify(viewerQuery.data.viewer.login)}
      </p>
      {userReposQuery.data && (
        <>
          <p>
            {'repos are: '}
          </p>
          {userReposQuery.data.user.repositories.nodes
            .reduce((prev, cur, idx) => {
              // group by 3
              if (idx % 3 === 0) {
                prev.push([cur])
              } else {
                prev[prev.length - 1].push(cur);
              }
            }, [])
            .map(a => (
              <Row>
                <p>Name: {a.name}</p>
                <p>Description: {a.description}</p>
                <hr />
              </Row>
            ))}
        </>
      )}
    </div>
  );
};

export default RepoList;
