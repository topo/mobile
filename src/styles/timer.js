import { css } from '@emotion/core';

import variables from './variables';

export default ({ progress }) => (css`
  position:fixed;
  top:4pt;
  left:12pt;
  right:12pt;
  height:3pt;
  border-radius:2pt;
  overflow:hidden;
  background:${variables.blakeColor};
  #progress {
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    width:${progress}%;
    background:${variables.blueColor};
    transition:width .3s;
  }
`);
