import React from 'react'
import { connect } from 'react-redux'

const Progress = ({timer}) => {
  let value = timer/4*100;
  if (value===0){value=3};
  return (
    <div class="loading">
      <div id="progress" style={{width:`${value}%`}}>
      </div>
    </div>
  )
}
export default connect(
  state => ({
    timer:state.timer
  })
)(Progress, 'Progress')
