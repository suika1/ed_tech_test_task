import React from 'react';
import { withRouter } from 'react-router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Badge, Col, Button } from 'antd';
import { BackwardFilled } from '@ant-design/icons';
import { history } from 'api/history';
import moment from 'moment';

import s from './styles.sass';
import { AuthorWithAvatar } from '../../components/authorWithAvatar';

const GET_REPO_INFO = gql`
  query GET_REPO_INFO(
    $name: String!
  ) {
    viewer {
      login
      repository(
        name: $name
      ) {
        id
        name
        url
        description
        pushedAt
        languages(first: 100) {
          nodes {
            id
            name
            color
          }
        }
        collaborators {
          nodes {
            id
            url
            avatarUrl
            name
            login
          }
        }
        ref(qualifiedName: "dev") {
          target {
            ... on Commit {
              id
              history(first: 10) {
                totalCount
                nodes {
                  id
                  author {
                    user {
                      login
                      name
                      avatarUrl
                      url
                    }
                  }
                  url
                  committedDate
                  message
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Repo = ({
  match,
}) => {
  const {
    error,
    loading,
    data,
  } = useQuery(GET_REPO_INFO, {
    variables: {
      name: match.params.name,
    },
  });

  if (loading) return (<p>Loading...</p>);
  if (error) {
    return (
      <p>
        {'Error: '}
        {error.message}
      </p>
    );
  }

  const { repository } = data.viewer;

  const commits = (
    repository.ref
    && repository.ref.target
    && repository.ref.target.history
      ? repository.ref.target.history.nodes
      : []
  )
    .sort((one, two) => moment(two.committedDate) - moment(one.committedDate));

  return (
    <div className={s.wrapper}>
      <Button
        className={s.goBackBtn}
        icon={<BackwardFilled />}
        onClick={() => {
          history.push('/repos');
        }}
      >
        Return to list
      </Button>
      <Col span={18}>
        <a href={repository.url} target="_blank" rel="noopener noreferrer" className={s.urlWrapper}>
          <div>
            <h1>
              {repository.name}
            </h1>
          </div>
        </a>
        <h2>{repository.description}</h2>
        <h2>Languages: </h2>
        <div className={s.languageList}>
          {repository.languages.nodes.map(language => (
            <Badge key={language.id} dot color={language.color} text={language.name} />
          ))}
        </div>
        <h2>Collaborators: </h2>
        <div className={s.collaboratorList}>
          {repository.collaborators.nodes.map(collaborator => (
            <AuthorWithAvatar
              key={collaborator.id}
              author={collaborator}
            />
          ))}
        </div>
        <h2>Latest commits: </h2>
        <div className={s.commitList}>
          {commits.map(commit => (
            <div key={commit.id} className={s.commit}>
              <AuthorWithAvatar
                author={commit.author.user}
              />
              <a className={s.commitMessage} href={commit.url} target="_blank" rel="noopener noreferrer">
                {` ${commit.message}`}
              </a>
            </div>
          ))}
        </div>
      </Col>
    </div>
  );
};

export default withRouter(Repo);
