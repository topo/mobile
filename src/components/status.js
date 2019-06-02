/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import { jsx, css } from '@emotion/core';

import variables from '../style/variables';

const styles = ({ online }) => (css`
    position:absolute;
    left:12pt;
    top:12pt;
    width:50%;
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
      width:10pt;
      height:10pt;
      margin:0;
      margin-right:4pt;
      margin-bottom:1pt;
      border-radius:50%;
      background: ${online ? variables.greenColor : variables.redColor};
    }
`);

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
