import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import Turbolinks from 'turbolinks'

import {
  reducer,
  updatePosts,
  updateCategories,
  switchToPost,
  setTimer
} from './data'
import {
  fetchPosts,
  fetchCategories
} from './api'

import './style/main.scss'

import App from './components/app'
import Hud from './components/hud'


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js')
    .then(
      function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      }
    );
}

Turbolinks.start();

const theStore = createStore(reducer, undefined, applyMiddleware(thunkMiddleware))

fetchCategories().then(categories => {
  theStore.dispatch(updateCategories(categories))
  fetchPosts({categories}).then(posts => {
    theStore.dispatch(updatePosts(posts))
  })
})

// Loop next story
setInterval(function () {
  let { timer, post } = theStore.getState();

  function nextPost() {
    let next = post + 1;
    if (document.getElementById('post-'+next)) {
      theStore.dispatch(switchToPost(next));
    } else {
      theStore.dispatch(switchToPost(0));
    }
  }

  if (timer < 4) {
    theStore.dispatch(setTimer( timer + 1 ));
  } else {
    theStore.dispatch(setTimer( 0 ));
    nextPost()
  }

}, 1000);

render(
  <Provider store={theStore}>
    <App/>
    <Hud/>
  </Provider>,
  document.getElementById('root')
);
