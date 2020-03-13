import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Col, Card } from 'antd';
import { history } from 'api/history';
import { TIMEOUT } from '../constants';

import s from './styles.sass';

const getPushedAtLabel = (pushedAt) => {
  if (!pushedAt || !moment(pushedAt).isValid()) {
    return '-';
  }

  if (moment().diff(pushedAt, 'minutes') < 1) {
    return 'Только что';
  }
  if (moment().diff(pushedAt, 'hours') < 1) {
    return `${moment().diff(pushedAt, 'minutes')} минут назад`;
  }
  if (moment().diff(pushedAt, 'hours') < 24) {
    return `${moment().diff(pushedAt, 'hours')} часов назад`;
  }

  return moment(pushedAt).format('DD.MM.YYYY HH:mm');
};

export const RepoCard = ({
  repo,
}) => {
  const [pushedAtLabel, setPushedAtLabel] = useState(getPushedAtLabel(repo.pushedAt))

  useEffect(() => {
    setPushedAtLabel(getPushedAtLabel(repo.pushedAt));

    const timer = setInterval(() => {
      setPushedAtLabel(getPushedAtLabel(repo.pushedAt));
    }, TIMEOUT);

    return () => {
      clearInterval(timer);
    };
  }, [repo]);

  return (
    <Col className={s.cardWrapper} span={8}>
      <div className={s.card}>
        <Card
          title={repo.name}
          bordered={false}
          extra={<p>{pushedAtLabel}</p>}
          hoverable
          onClick={() => {
            history.push(`/repo/${repo.name}`)
          }}
        >
          <p>
            {'Description: '}
            {repo.description || ' *empty*'}
          </p>
        </Card>
      </div>
    </Col>
  );
};
