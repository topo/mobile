/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';

import styles from '../styles/timer';

const colors = [
  '#00aba9',
  '#ff0970',
  '#a200ff',
  '#1ba1e2',
  '#ffe800',
];

function getRandomColor() {
  const index = Math.floor(Math.random() * Math.floor(colors.length));
  return colors[index];
}

const Progress = ({ timer }) => {
  const [color, setColor] = useState('rgb(140,140,140);');
  const [progress, setProgress] = useState(2);

  useEffect(() => {
    let newProgress = timer / 4 * 100; // 4 sections
    if (newProgress === 0) {
      newProgress = 2;
      setColor(getRandomColor());
    }
    setProgress(newProgress);
  }, [timer]);

  return (
    <div css={styles({ progress, color })}>
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
