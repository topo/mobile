
import { css } from '@emotion/core';

import variables from './variables';


export default ({ active }) => (css`
  position:fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: ${active ? '100' : '0'}%;
  border-radius: ${active ? '0' : '6'}pt;  
  overflow: hidden;

  transition: height .6s, border-radius 1.5s .5s;
  transition-timing-function: cubic-bezier(.04,.54,.3,1);
  background-color: white;

  .header-filler {
    height:50pt;
  }

  .separator {
    display:block;
    width:100%;
    height:2pt;
    border-style: solid;
    border-color:${variables.darkbrandColor};
    border-width: 0px;
    border-top-width: 1pt;
    border-bottom-width: 1pt;
    opacity: 0.4;
  }

  .container {
    display: block;
    overflow:auto;
    max-width:100%;
  }
  .content {
    max-width: 100%;
    padding-left:6pt;
    padding-right:6pt;
  }
  .post-kicker {
    font-size: 12pt;
    font-weight: normal;
    color: white;
    background-color: ${variables.brandColor};
    display: inline-block;
    margin-top:12pt;
    margin-left: 6pt;
    padding: 2pt;
    padding-left: 3pt;
    padding-right: 3pt;
    border-radius: 1pt;
  }
  .post-title {
    margin-top:6pt;
    padding-left:6pt;
    padding-right:6pt;
    font-size: 22pt;
    display: inline-block;
    color: ${variables.blackColor};
    text-shadow: 2pt 2pt 0px ${variables.veryblakeColor};
  }
  .post-author {
    margin-left:6pt;
    padding-top: 6pt;
    padding-right:6pt;
    margin-bottom: 2pt;
    display: inline-block;
    font-size: 12pt;
    color: ${variables.brandColor};
    border-style: solid;
    border-color: ${variables.brandColor};
    border-width: 0pt;
    border-bottom-width: 1pt;
  }

  .bg-image {
    display:block;
    height: 48pt;
  }

  h1 {
    font-size: 14pt;
  }
  h2 {
    font-size: 14pt;
    padding-top: 6pt;
    padding-bottom: 6pt;
  }
  p {
    padding-top:6pt;
    padding-bottom:6pt;
    padding-right: 6pt;
    font-size:12pt;
    max-width: 35em;
    line-height: 1.3rem;
    text-align: justify;
    text-justify: initial;
  }
  img {
    max-width: 100%;
  }
  button {
    display: block;
    background: transparent;
    border-style:none;
    padding: 6pt;
    
  }
`);
