/** @jsx jsx */
import React from 'react';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';

import { _switchMenu, _switchToDisplayPost } from '../data';
import { Logo } from './icons';

import styles from '../styles/brand';

const Brand = ({
  switchMenu,
  setDisplayPost,
  menu,
  displayPost,
}) => {
  function toggleMenu(e) {
    e.preventDefault();
    if (displayPost) {
      setDisplayPost(null);
      switchMenu(true);
    } else {
      switchMenu(!menu);
    }
  }
  return (
    <div css={styles({ isMenu: menu, isPost: displayPost })} onClick={toggleMenu}>
          <div className="logo">
            <Logo width={200} height={100} fill='white'/>
          </div>
          <div className="text">
            <div className="background">
            </div>
            <span>topolitique.ch</span>
          </div>
    </div>
  );
};

export default connect(
  state => ({
    menu: state.menu,
    displayPost: state.displayPost,
  }),
  dispatch => ({
    switchMenu: (value) => { dispatch(_switchMenu(value)); },
    setDisplayPost: (post) => { dispatch(_switchToDisplayPost(post)); },
  }),
)(Brand, 'Brand');
