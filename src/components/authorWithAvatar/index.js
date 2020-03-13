import React from 'react';
import { Avatar } from 'antd';

import s from './styles.sass';

export const AuthorWithAvatar = ({
  author,
}) => {
  return (
    <a className={s.author} href={author.url} target="_blank" rel="noopener noreferrer">
      <div>
        <Avatar src={author.avatarUrl} />
        <h3>{author.name}</h3>
        <h3>{`'${author.login}'`}</h3>
      </div>
    </a>
  );
};
