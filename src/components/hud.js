import React from 'react'
import { connect } from 'react-redux'
import Swipe from 'react-easy-swipe';

import { setTimer, switchToPost, SWITCH_MENU } from '../data'

import { fetchPosts } from '../api'

import Menu from './menu'
import Brand from './brand'
import Progress from './progress'

const Hud = ({ setTimer, switchToPost, switchMenu, post, category, posts }) => {

  function onSwipeUp(e) {
    let currentPost = posts[post]
    if (currentPost) {
      var { link } = currentPost
      window.location = link
    }
  }

  function onSwipeLeft(e) {
    nextPost()
  }

  function onSwipeRight(e) {
    previousPost()
  }

  function nextPost(e) {
    let next = post + 1;
    if (document.getElementById('post-'+next)) {
      switchToPost(next);
    } else {
      switchToPost(0);
    }
    setTimer(0);
  }

  function previousPost(e) {
    let next = post - 1;
    if (document.getElementById('post-'+next)) {
      switchToPost(next);
    } else {
      switchToPost(0);
    }
    setTimer(0);
  }

  return (
    <div
      className="hud"
      allowMouseEvents={true}
      onSwipeUp={onSwipeUp}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      tolerance = {180}>
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
      <Progress />
    </div>
  )
}
export default connect(
  state => {
    return {
      posts:state.posts,
      post:state.post,
      category:state.category
    }
  },
  dispatch => {
    return {
      setTimer: (timer) => {dispatch(setTimer(timer))},
      switchToPost: (id) => {dispatch(switchToPost(id))},
      switchMenu: () => {dispatch({type:SWITCH_MENU})}
    }
  }
)(Hud, 'Hud')
