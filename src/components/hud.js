import React from 'react'
import { connect } from 'react-redux'

import { switchToPost, SWITCH_MENU } from '../data'

import { fetchPosts } from '../api'

import Menu from './menu'
import Brand from './brand'

const Hud = ({ switchToPost, switchMenu, post, category }) => {

  function nextPost(e) {
    let next = post + 1;
    if (document.getElementById('post-'+next)) {
      switchToPost(next);
    } else {
      switchToPost(0);
    }
  }

  return (
    <div class="hud">
      <div class="navigation">
        <a class="nav-left">
        </a>
        <a className="nav-next" onClick={nextPost}>
          <img src="assets/next.png" />
        </a>
      </div>

      <Brand />

      <div className="message" onClick={switchMenu}>
        {category}
      </div>

      <Menu />
    </div>
  )
}
export default connect(
  state => {
    return {
      post:state.post,
      category:state.category
    }
  },
  dispatch => {
    return {
      switchToPost: (id) => {dispatch(switchToPost(id))},
      switchMenu: () => {dispatch({type:SWITCH_MENU})}
    }
  }
)(Hud, 'Hud')
