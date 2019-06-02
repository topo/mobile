/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import { jsx, css } from '@emotion/core';

import variables from '../style/variables';

const styles = ({ progress }) => (css`
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

const Progress = ({ timer }) => {
  let progress = timer / 4 * 100;
  if (progress === 0) { progress = 2; }
  return (
    <div css={styles({ progress })}>
      <div id="progress">
      </div>
    </div>
  );
};
export default connect(
  state => ({
    timer: state.timer,
  }),
)(Progress, 'Progress');
