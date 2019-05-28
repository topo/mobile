import React from 'react';
import { connect } from 'react-redux';

import {
  _updatePosts, _switchToCategory, _switchToPost, SWITCH_MENU,
} from '../data';
import { fetchPosts } from '../api';

import { CloseIcon, LatestIcon } from './icons';

const SocialIconsContainer = ({ social }) => Object.keys(social).map((media, i) => {
  const icon = social[media];
  return (
    <a
      key={i}
      className={ `icon ${media}` }
      href={icon}
      title={media}
      target="_blank"
      rel="noopener noreferrer" >
      {media}
    </a>
  );
});
const SocialIcons = connect(
  state => ({ social: state.social }),
)(SocialIconsContainer, 'SocialIcons');

const Menu = ({
  categories, isMenu, switchMenu, switchToPost, switchToCategory, updatePosts,
}) => {
  function changeCategories(e, cat) {
    e.preventDefault();
    updatePosts([]);
    if (cat.length === 1) {
      switchToCategory(cat[0].name);
    }
    switchMenu();

    fetchPosts({ categories: cat, noCache: true }).then((posts) => {
      updatePosts(posts);
      switchToPost(0);
    });
  }

  const links = categories.map((cat) => {
    if (!cat.name.includes('Non répertorié') && !cat.name.includes('Non classé')) {
      const { name } = cat;
      const displayName = name;
      return (
        <a className="menu-link" key={cat.id} onClick={e => changeCategories(e, [cat])}>
          {displayName}
        </a>
      );
    }
    return null;
  });

  return (
    <div id="menu" className={(isMenu) ? 'active' : ''}>
      <div className="header-container">
        <button onClick={switchMenu}>
          <CloseIcon width={46} height={46} fill={'#BB0D00'}/>
        </button>
        <button onClick={e => changeCategories(e, categories)}>
          <LatestIcon width={46} height={46} fill={'#BB0D00'}/>
        </button>
      </div>
      <div className="menu-container">
        {links}
        <SocialIcons />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    isMenu: state.isMenu,
    categories: state.categories,
  }),
  dispatch => ({
    updatePosts: (posts) => { dispatch(_updatePosts(posts)); },
    switchMenu: () => { dispatch({ type: SWITCH_MENU }); },
    switchToCategory: (category) => { dispatch(_switchToCategory(category)); },
    switchToPost: (post) => { dispatch(_switchToPost(post)); },
  }),
)(Menu, 'Menu');
