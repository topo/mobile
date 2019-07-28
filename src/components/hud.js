/** @jsx jsx */
import React from 'react';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';

import { _setTimer, _switchToPost } from '../data';

import styles from '../styles/hud';

import Menu from './menu';
import Brand from './brand';
import Timer from './timer';
import Status from './status';
import DisplayPost from './post';

import {
  NextIcon,
  PreviousIcon,
} from './icons';

const Hud = ({
  setTimer, switchToPost, post,
}) => {
  function nextPost() {
    const next = post + 1;
    if (document.getElementById(`post-${next}`)) {
      switchToPost(next);
    } else {
      switchToPost(0);
    }
    setTimer(0);
  }
  function previousPost() {
    const next = post - 1;
    if (document.getElementById(`post-${next}`)) {
      switchToPost(next);
    } else {
      switchToPost(0);
    }
    setTimer(0);
  }

  return (
    <div css={styles()}>
      <div className="navigation">
        <a className="previous" onClick={previousPost} title="Attends, fais voir l'autre">
          <PreviousIcon height={30} width={45} fill='rgba(200,200,200,0.8)' />
        </a>
        <a className="next" onClick={nextPost} title="Au suivant!">
          <NextIcon height={40} width={45} fill='rgba(220,220,220,1)' />
        </a>
      </div>
      <Status />
      <Timer />
      <Brand />
      <DisplayPost />
      <Menu />
    </div>
  );
};
export default connect(
  state => ({
    post: state.post,
  }),
  dispatch => ({
    setTimer: (timer) => { dispatch(_setTimer(timer)); },
    switchToPost: (id) => { dispatch(_switchToPost(id)); },
  }),
)(Hud, 'Hud');
