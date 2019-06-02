/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import { jsx, css } from '@emotion/core';

import { SWITCH_MENU } from '../data';
import { Logo } from './icons';
import variables from '../style/variables';

const style = ({ isMenu }) => {
  let styel = css`
    position:absolute;
    top:12pt;
    right:12pt;
    overflow:hidden;
    border-radius:2pt;
    z-index:200;
    .logo {
      width:72pt;
      height: 32pt;
      padding-bottom: 4pt;
      padding-left: 9pt;
      padding-right: 9pt;
      padding-top: 9pt;
      background-color:${variables.brandColor};
      transition: padding-bottom 0.4s, border-radius 0.5s 0.4s;
    }
    svg {
      width:inherit;
      height:inherit;
    }
    .text {
      color:white;
      font-size: 8pt;
      font-weight: 500;
      letter-spacing: 0.1em;
      max-height: 40pt;
      padding-bottom: 2pt;
      padding-top: 2pt;
      position: relative;
      text-align: center;
      text-transform: uppercase;
      transition: all 0.35s;
    }
    .background {
      background: ${variables.darkbrandColor};
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      transition: width 0.4s;
      width: 100%;
      z-index: -2;
    }
  `;
  if (isMenu) {
    styel = css`
      ${styel};
      .logo {
        padding-bottom:9pt
      }
      .text {
        max-height:0;
        padding:0;
      }
      .background {
        width:0%;
      }
    `;
  }
  return styel;
};


const Brand = ({ switchMenu, isMenu }) => (
    <div css={style({ isMenu })} onClick={switchMenu}>
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
