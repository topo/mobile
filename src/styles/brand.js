import { css } from '@emotion/core';

import variables from './variables';

export default ({ isMenu, isPost }) => {
  let style = css`
    position:fixed;
    top:12pt;
    right:12pt;
    overflow:hidden;
    border-radius:1pt;
    z-index:200;
    tranform: scale(1);
    transition: top .3s .1s, border-radius .3s, transform .2s .15s;

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
      font-size: 9pt;
      line-height: 12pt;
      font-weight: 500;
      letter-spacing: 0.03em;
      max-height: 40pt;
      padding-bottom: 2pt;
      padding-top: 2pt;
      position: relative;
      text-align: center;
      transition: all  0.40s;
    }
    .background {
      background: ${variables.darkbrandColor};
      height: 100%;
      width: 100%;
      position: absolute;
      right: 0;
      top: 0;
      transition: width 0.4s;
      z-index: -2;
    }
  `;
  if (isMenu) {
    style = css`
      ${style};

      border-radius:3pt;
      transform: scale(.9);

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

  if (isPost) {
    style = css`
      ${style};
      top: -64pt;
    `;
  }
  return style;
};
