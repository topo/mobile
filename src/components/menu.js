/** @jsx jsx */
import React from 'react';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';

import {
  _updatePosts, _switchToCategory, _switchToPost, SWITCH_MENU,
} from '../data';
import { fetchPosts } from '../api';

import styles from '../styles/menu';

import {
  YouTubeIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  CloseIcon,
  LatestIcon,
} from './icons';

const SocialIconsContainer = ({ social }) => Object.keys(social).map((media, i) => {
  const icon = social[media];
  const icoProps = {
    width: 60,
    height: 60,
  };
  let svg = <TwitterIcon { ...icoProps } />;
  if (media === 'twitter') {
    svg = <TwitterIcon { ...icoProps } />;
  } else if (media === 'facebook') {
    svg = <FacebookIcon { ...icoProps } />;
  } else if (media === 'instagram') {
    svg = <InstagramIcon { ...icoProps } />;
  } else if (media === 'youtube') {
    svg = <YouTubeIcon { ...icoProps } />;
  }
  return (
    <a
      key={i}
      className={ `icon ${media}` }
      href={icon}
      title={media}
      target="_blank"
      rel="noopener noreferrer" >
      {svg}
    </a>
  );
});
const SocialIcons = connect(
  state => ({ social: state.social }),
)(SocialIconsContainer, 'SocialIcons');

const Menu = ({
  categories, uiCategories, isMenu, switchMenu, switchToPost, switchToCategory, updatePosts,
}) => {
  function changeCategories(e, cat) {
    e.preventDefault();
    updatePosts([]);
    if (cat.length === 1) {
      switchToCategory(cat[0].name);
    } else {
      switchToCategory(null);
    }
    switchMenu();

    fetchPosts({ categories: cat, noCache: true }).then((posts) => {
      updatePosts(posts);
      switchToPost(0);
    });
  }

  const links = uiCategories.map((cat) => {
    if (!cat.name.includes('Non répertorié') && !cat.name.includes('Non classé')) {
      const { name } = cat;
      const displayName = name;
      return (
        <a className="link" key={cat.id} title={cat.name} onClick={e => changeCategories(e, [cat])}>
          {displayName}
        </a>
      );
    }
    return null;
  });

  return (
    <div id="menu" css={styles({ isMenu })}>
      <div className="header-container">
        <button onClick={switchMenu} title="Close menu">
          <CloseIcon width={46} height={46} fill={'#BB0D00'}/>
        </button>
        <button onClick={e => changeCategories(e, categories)} title="Home">
          <LatestIcon width={46} height={46} fill={'#BB0D00'}/>
        </button>
      </div>
      <div className="menu-container">
        {links}
        <div className="social">
          <SocialIcons />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    isMenu: state.isMenu,
    categories: state.categories,
    uiCategories: state.uiCategories,
  }),
  dispatch => ({
    updatePosts: (posts) => { dispatch(_updatePosts(posts)); },
    switchMenu: () => { dispatch({ type: SWITCH_MENU }); },
    switchToCategory: (category) => { dispatch(_switchToCategory(category)); },
    switchToPost: (post) => { dispatch(_switchToPost(post)); },
  }),
)(Menu, 'Menu');
