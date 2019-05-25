import React from 'react'
import { connect } from 'react-redux'

import { switchToPost, SWITCH_MENU } from '../data'

import nextImage from '../assets/next.png';
import glassesIcon from '../assets/glasses.svg';


const Hud = ({ switchToPost, switchMenu, isMenu, post, posts }) => {

  function nextPost(e) {
    let next = post + 1;
    console.log('Next post',next);
    if (document.getElementById('post-'+next)) {
      switchToPost(next);
    } else {
      switchToPost(0);
    }
  }

  return (
    <div class="hud">
      <div class="watermark" onClick={switchMenu}>
        <div class="logo">
          <img src={glassesIcon} />
        </div>
        <div class="brand">
          <span>Topolitique.ch</span>
        </div>
      </div>

      <div class="navigation">
        <a class="nav-left">
        </a>
        <a className="nav-next" onClick={nextPost}>
          <img src={nextImage} />
        </a>
      </div>

      <div className="message">
        Message
      </div>

      <div id="menu" className={(isMenu) ? 'active' : ''}>
        <div class="menu-container">
          <div class="menu-title">
            Sections
          </div>

          <a class="menu-link" href="#">
            [Index]
          </a>
          <a class="menu-link">Link</a>
        </div>
      </div>
    </div>
  )
}
export default connect(
  state => {
    return {
      post:state.post,
      posts:state.posts,
      isMenu:state.isMenu
    }
  },
  dispatch => {
    return {
      switchToPost: (id) => {dispatch(switchToPost(id))},
      switchMenu: () => {dispatch({type:SWITCH_MENU})}
    }
  }
)(Hud, 'Hud')
