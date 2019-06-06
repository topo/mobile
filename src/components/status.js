/** @jsx jsx */
import React from 'react';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';

import styles from '../styles/status';

const Status = ({ lastUpdated, category }) => {
  const online = ('onLine' in navigator) ? navigator.onLine : false;
  let status = '';
  if (lastUpdated) {
    const when = new Date(lastUpdated);
    const hours = when.getHours();
    let mins = when.getMinutes();
    if (mins < 10) { mins = `0${mins.toString()}`; }
    status = `${hours}h${mins}`;
  } else {
    status = online ? 'A jour' : "Connectez-vous à l'interwebs";
  }

  return (
    <div css={styles({ online })}>
      <div className="category">
        {category || 'Derniers articles'}
      </div>
      <div className="status">
        <span className="pin"></span>
        {status}
      </div>
    </div>
  );
};
export default connect(
  state => ({
    category: state.category,
    lastUpdated: state.lastUpdated,
  }),
)(Status, 'Status');
