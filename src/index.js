import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import Turbolinks from 'turbolinks'

import {
  reducer,
  updatePosts
} from './data'
import { fetchPosts } from './api'

import './assets/style.scss'
import App from './components/app'
import Hud from './components/hud'


Turbolinks.start()

const theStore = createStore(reducer, undefined, applyMiddleware(thunkMiddleware))

fetchPosts().then(data => {
  console.log('Got data:', data)
  theStore.dispatch(updatePosts(data))
})

render(
  <Provider store={theStore}>
    <App/>
    <Hud/>
  </Provider>,
  document.getElementById('root')
);
