import React from 'react'
import { connect } from 'react-redux'
import he from 'he'

import { updatePosts, switchToCategory, switchToPost, SWITCH_MENU } from '../data'
import { fetchPosts } from '../api'

import { CloseIcon, LatestIcon } from './icons'

const Menu = ({categories, isMenu, switchMenu, switchToPost, switchToCategory, updatePosts}) => {

  function changeCategories(e, cat) {
    e.preventDefault();

    updatePosts([]);
    if (cat.length === 1) {
      switchToCategory(cat[0].name);
    }
    switchMenu()

    fetchPosts({categories:cat}).then(posts => {
      updatePosts(posts);
      switchToPost(0)
    })

  }

  let links = categories.map(cat => {
    if (!cat.name.includes('Non répertorié') && !cat.name.includes('Non classé')) {
      let { name } = cat;
      let displayName = he.decode(name);
      return (
        <a class="menu-link" onClick={(e)=>changeCategories(e,[cat])}>
          {displayName}
        </a>
      )
    }
  })

  return (
    <div id="menu" className={(isMenu) ? 'active' : ''}>
      <div className="header-container">
        <button onClick={switchMenu}>
          <CloseIcon width={46} height={46} fill={'#BB0D00'}/>
        </button>
        <button onClick={(e)=>changeCategories(e,categories)}>
          <LatestIcon width={46} height={46} fill={'#BB0D00'}/>
        </button>
      </div>
      <div class="menu-container">
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
