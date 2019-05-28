import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
// import Turbolinks from 'turbolinks';

import {
  reducer,
  _updatePosts,
  _updateSocial,
  _updateCategories,
  _switchToPost,
  _setTimer,
} from './data';
import {
  fetchPosts,
  fetchCustomUserInterface,
} from './api';

import './style/main.scss';

import App from './components/app';
import Hud from './components/hud';


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js')
    .then(
      (registration) => {
        // eslint-disable-next-line no-console
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.log('ServiceWorker registration failed: ', err);
      },
    );
}

// Turbolinks.start();

const theStore = createStore(reducer, undefined, applyMiddleware(thunkMiddleware));

fetchCustomUserInterface().then((data) => {
  const { menus, social } = data;
  const categories = menus.categories.data;

  theStore.dispatch(_updateSocial(social));
  theStore.dispatch(_updateCategories(categories));

  fetchPosts({ categories }).then((posts) => {
    theStore.dispatch(_updatePosts(posts));
  });
});

// Loop next story
setInterval(() => {
  const { timer, post } = theStore.getState();

  function nextPost() {
    const next = post + 1;
    if (document.getElementById(`post-${next}`)) {
      theStore.dispatch(_switchToPost(next));
    } else {
      theStore.dispatch(_switchToPost(0));
    }
  }

  if (timer < 4) {
    theStore.dispatch(_setTimer(timer + 1));
  } else {
    theStore.dispatch(_setTimer(0));
    nextPost();
  }
}, 1000);

render(
  <Provider store={theStore}>
    <App/>
    <Hud/>
  </Provider>,
  document.getElementById('root'),
);
