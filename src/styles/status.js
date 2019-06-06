import { css } from '@emotion/core';

import variables from './variables';

export default ({ online }) => (css`
    position:absolute;
    left:12pt;
    top:12pt;
    width:75%;
    .category {
      margin:0;
      padding:0;
      color: white;
      font-size: 10pt;
      font-weight: 500;
      text-shadow: ${variables.textShadow};
    }
    .status {
      margin:0;
      padding:0;
      font-size:9pt;
      line-height:16pt;
      vertical-align:middle;
      color: #fff;
      text-shadow: ${variables.textShadow};
    }
    .pin {
      display: inline-block;
      vertical-align:middle;
      width:8pt;
      height:8pt;
      margin:0;
      margin-right:4pt;
      margin-bottom:3pt;
      border-radius:50%;
      background: ${online ? variables.greenColor : variables.redColor};
      box-shadow: ${variables.boxShadow};
    }
`);
