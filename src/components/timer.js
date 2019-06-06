/** @jsx jsx */
import React from 'react';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';

import styles from '../styles/timer';

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
