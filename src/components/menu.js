import React from 'react'
import { connect } from 'react-redux'
import he from 'he'

import { updatePosts, switchToCategory, switchToPost, SWITCH_MENU } from '../data'
import { fetchPosts } from '../api'

const Menu = ({categories, isMenu, switchMenu, switchToPost, switchToCategory, updatePosts}) => {

  function changeCategory(e, cat) {
    e.preventDefault();

    fetchPosts({categories:[ cat ]}).then(posts => {
      updatePosts(posts);
      switchToCategory(cat.name)
      switchMenu()
      switchToPost(0)
    })

  }

  let links = categories.map(cat => {
    if (!cat.name.includes('Non répertorié') && !cat.name.includes('Non classé')) {
      let { name } = cat;
      let displayName = he.decode(name);
      return (
        <a class="menu-link" onClick={(e)=>changeCategory(e,cat)}>
          {displayName}
        </a>
      )
    }
  })

  return (
    <div id="menu" className={(isMenu) ? 'active' : ''}>
      <div class="menu-container">
        <div class="menu-title">
          Sections
        </div>

        {links}

      </div>
    </div>
  )
}

export default connect(
  state => ({
    isMenu:state.isMenu,
    categories:state.categories
  }),
  dispatch => {
    return {
      updatePosts: (posts) => {dispatch(updatePosts(posts))},
      switchMenu: () => {dispatch({type:SWITCH_MENU})},
      switchToCategory: (category) => {dispatch(switchToCategory(category))},
      switchToPost: (post) => {dispatch(switchToPost(post))}
    }
  }
)(Menu, 'Menu')
