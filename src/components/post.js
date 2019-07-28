/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';

import { _switchMenu, _switchToDisplayPost } from '../data';
import styles from '../styles/post';

import {
  CloseIcon,
} from './icons';

const defaultPost = {
  title: { rendered: null },
  coauthors: [],
  content: { rendered: null },
  meta: { kicker: null },
  image: '',
};

export const Post = ({
  displayPost,
  setDisplayPost,
}) => {
  const [post, setPost] = useState(defaultPost);
  useEffect(() => {
    if (displayPost) {
      setPost(displayPost);
      if (window.location.href.startsWith('https:://topolitique.ch/beta')) {
        window.history.pushState({}, null, displayPost.link);
      }
    }
  }, [displayPost]);
  // eslint-disable-next-line no-console
  console.log(post);

  function closePost(e) {
    e.preventDefault();
    setDisplayPost(null);
  }

  const Authors = post.coauthors.map((item) => {
    const { name } = item;
    return (
    <div key={name} className="post-author">
     {name}
    </div>
    );
  });

  return (
    <div css={styles({ active: (displayPost) })}>
      <div className="container">
          <div className="header-filler">
            <button title="Close menu" onClick={closePost}>
              <CloseIcon width={46} height={46} fill={'#BB0D00'}/>
            </button>
          </div>
          <h1 className="post-kicker">{post.meta.kicker || ''}</h1>
          <h1 className="post-title">{post.title.rendered || 'kicker'}</h1>
          {Authors}
        <div className="separator" />
        <div
          className="bg-image"
          style={ (post.image && post.image.startsWith('https://')) ? { backgroundImage: `url(${post.image})` } : null}
        />
        <div className="content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    displayPost: state.displayPost,
  }),
  dispatch => ({
    setMenu: (value) => { dispatch(_switchMenu(value)); },
    setDisplayPost: (value) => { dispatch(_switchToDisplayPost(value)); },
  }),
)(Post, 'Post');
