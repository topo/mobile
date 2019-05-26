
import React from 'react'
import { connect } from 'react-redux'

import { SWITCH_MENU } from '../data'

import { Logo } from './icons'


const Brand = ({switchMenu, isMenu }) => {

  return (
    <div class={(isMenu) ? 'watermark menu' : 'watermark'} onClick={switchMenu}>
      <div class="logo">
        <div class="background">
        </div>
        <Logo width={200} height={100} fill='white'/>
      </div>
      <div class="brand">
        <div class="background"></div>
        <span>Topolitique.ch</span>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    isMenu:state.isMenu
  }),
  dispatch => ({
    switchMenu: () => {dispatch({type:SWITCH_MENU})}
  })
)(Brand, 'Brand')
