import { css } from '@emotion/core';

import variables from './variables';


export default ({ menu }) => {
  let style = css`
    position:fixed;
    left:0;
    right:0;
    top:0;
    height: 0px;
    overflow:hidden;
    transform: scale(1.1);
    transition: transform .2s;

    .header-container {
      margin-left: 12pt;
      margin-right: 12pt;
      margin-top: 14pt;
      overflow: hidden;
      padding-top: 6pt;
      padding-bottom: 6pt;
    }

    .header-container button {
      background: transparent;
      border-style: none;
      display: block;
      float: left;
      margin-right: 4pt;
      outline: none;
    }

    .menu-container {
      margin-left: 16pt;
      margin-right: 14pt;
      margin-top:12pt;

      ul,
      ol {
        list-style-type: none;
      }
    }

    .link {
      color: #000;
      display: block;
      font-size: 16pt;
      font-weight: 600;
      padding-bottom: 6pt;
      padding-top: 6pt;
      width: 100%;
      border-style: solid;
      border-width: 0;
      border-bottom-width: 1px;
      border-color:${variables.borderColor};
    }

    .social {
      display: flex;
      flex-direction: row;
      justify-content: stretch;
      width: 100%;
      border-style:solid;
      border-width:0px;
      border-bottom-width:1px;
      border-color:${variables.borderColor};
    }

    .social .icon {
      flex:1;
      height:60pt;
      border-style:solid;
      border-width:0px;
      border-left-width:1px;
      border-color:${variables.borderColor};

      display:flex;
      justify-content: stretch;
      align-items:center;
    }
    .social .icon:nth-of-type(1) {
      border-color: transparent;
    }
    .social .icon svg {
      margin:0 auto;
    }
  `;
  if (menu) {
    style = css`
      ${style};
      display:block;
      background: white;
      height:100%;
      transform: scale(1);
    `;
  }
  return style;
};
