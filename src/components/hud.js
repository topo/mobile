import React from 'react';
import { connect } from 'react-redux';

import { _setTimer, _switchToPost, SWITCH_MENU } from '../data';

import Menu from './menu';
import Brand from './brand';
import Progress from './progress';

const Hud = ({
  setTimer, switchToPost, _switchMenu, post, category,
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
  // eslint-disable-next-line no-unused-vars
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
        <a className="nav-left">
        </a>
        <a className="nav-next" onClick={nextPost}>
          <img src="assets/next.png" />
        </a>
      </div>

      <Brand />

      <div className="message" onClick={_switchMenu}>
        {category}
      </div>

      <Menu />
      <Progress />
    </div>
  );
};
export default connect(
  state => ({
    post: state.post,
    category: state.category,
  }),
  dispatch => ({
    setTimer: (timer) => { dispatch(_setTimer(timer)); },
    switchToPost: (id) => { dispatch(_switchToPost(id)); },
    switchMenu: () => { dispatch({ type: SWITCH_MENU }); },
  }),
)(Hud, 'Hud');
