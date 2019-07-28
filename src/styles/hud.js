import { css } from '@emotion/core';

// import variables from './variables';

export default () => {
  const style = css`
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 110;

    .navigation {
      background: linear-gradient(transparent, rgba(30, 30, 30, 0.8));
      bottom: 0;
      height: 56pt;
      position: fixed;
      width: 100%;
    }

    .next {
      color: #fff;
      cursor: pointer;
      display: block;
      float: right;
      margin: 6pt;
      margin-right: 16pt;
      padding: 4pt;
    }

    .previous {
      color: #fff;
      cursor: pointer;
      display: block;
      float: left;
      margin: 6pt;
      margin-left: 16pt;
      padding: 4pt;
    }
  `;
  return style;
};
