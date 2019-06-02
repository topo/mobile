import React from 'react';
import { connect } from 'react-redux';

import { _setTimer, _switchToPost } from '../data';

import Menu from './menu';
import Brand from './brand';
import Timer from './timer';
import Status from './status';

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
    <div className="hud">
      <div className="navigation">
        <a className="previous" onClick={previousPost} title="Attends, fais voir l'autre">
          <PreviousIcon height={36} width={56} fill='rgba(200,200,200,0.6)' />
        </a>
        <a className="next" onClick={nextPost} title="Au suivant!">
          <NextIcon height={36} width={56} fill='rgba(220,220,220,0.9)' />
        </a>
      </div>
      <Status />
      <Timer />
      <Brand />
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
