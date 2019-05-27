
import React from 'react';
import { connect } from 'react-redux';

import { SWITCH_MENU } from '../data';

import { Logo } from './icons';


const Brand = ({ switchMenu, isMenu }) => (
    <div className={(isMenu) ? 'watermark menu' : 'watermark'} onClick={switchMenu}>
      <div className="logo">
        <div className="background">
        </div>
        <Logo width={200} height={100} fill='white'/>
      </div>
      <div className="brand">
        <div className="background"></div>
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
