import React from 'react';
import { connect } from 'react-redux';

import { _setTimer, _switchToPost, SWITCH_MENU } from '../data';

import Menu from './menu';
import Brand from './brand';
import Timer from './timer';
import {
  NextIcon,
  PreviousIcon,
} from './icons';

const StatusContainer = ({ lastUpdated }) => {
  let online = '';
  if ('onLine' in navigator) {
    online = (navigator.onLine) ? 'online' : 'offline';
  }

  let status = '';
  if (lastUpdated) {
    const when = new Date(lastUpdated);
    const hours = when.getHours();
    let mins = when.getMinutes();
    if (mins < 10) { mins = `0${mins.toString()}`; }

    status = `${hours}h${mins}`;
  } else {
    status = (online === 'online') ? 'A jour' : "Connectez-vous à l'interwebs";
  }
  return (
    <div className="status">
      <span className={`pin ${online}`}></span>
      {status}
    </div>
  );
};
const Status = connect(
  state => ({
    lastUpdated: state.lastUpdated,
  }),
)(StatusContainer, 'Status');

const Hud = ({
  setTimer, switchToPost, switchMenu, post, category,
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
        <a className="previous" onClick={previousPost} title="Attends, fais voir l'autre">
          <PreviousIcon height={36} width={56} fill='rgba(200,200,200,0.6)' />
        </a>
        <a className="next" onClick={nextPost} title="Au suivant!">
          <NextIcon height={36} width={56} fill='rgba(220,220,220,0.9)' />
        </a>
      </div>

      <div className="message" onClick={switchMenu} >
        {category || 'Derniers articles'}
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
    category: state.category,
  }),
  dispatch => ({
    setTimer: (timer) => { dispatch(_setTimer(timer)); },
    switchToPost: (id) => { dispatch(_switchToPost(id)); },
    switchMenu: () => { dispatch({ type: SWITCH_MENU }); },
  }),
)(Hud, 'Hud');
