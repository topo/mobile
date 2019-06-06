/** @jsx jsx */
import React from 'react';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';

import { SWITCH_MENU } from '../data';
import { Logo } from './icons';

import styles from '../styles/brand';

const Brand = ({ switchMenu, isMenu }) => (
    <div css={styles({ isMenu })} onClick={switchMenu}>
      <div className="logo">
        <Logo width={200} height={100} fill='white'/>
      </div>
      <div className="text">
        <div className="background">
        </div>
        <span>Topolitique.ch</span>
      </div>
    </div>
);

export default connect(
  state => ({
    isMenu: state.isMenu,
  }),
  dispatch => ({
    switchMenu: () => { dispatch({ type: SWITCH_MENU }); },
  }),
)(Brand, 'Brand');
