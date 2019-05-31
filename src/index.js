import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
// import Turbolinks from 'turbolinks';

import {
  reducer,
  _updatePosts,
  _updateUISocial,
  _updateUICategories,
  _updateUILastUpdated,
  _updateCategories,
  _switchToPost,
  _setTimer,
} from './data';
import {
  fetchPosts,
  fetchCustomUserInterface,
  fetchCategories,
} from './api';

import './style/main.scss';

import App from './components/app';
import Hud from './components/hud';

const theStore = createStore(reducer, undefined, applyMiddleware(thunkMiddleware));

// Service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceworker.js', {
    useCache: true,
  }).then(
    (registration, err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('service worker registered : ', registration.scope);

      window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // eslint-disable-next-line no-console
          console.log('notifications have been granted!');
        }
      });
    },
  );

  navigator.serviceWorker.addEventListener('message', (event) => {
    theStore.dispatch(_updateUILastUpdated(event.data));
  });
} else {
  // eslint-disable-next-line no-console
  console.log("service worker doesn't seem to be permitted");
}

// Load data
fetchCustomUserInterface().then((data) => {
  const { menus, social } = data;
  const uiCategories = menus.categories.data;

  theStore.dispatch(_updateUISocial(social));
  theStore.dispatch(_updateUICategories(uiCategories));

  fetchCategories().then((categories) => {
    theStore.dispatch(_updateCategories(categories));

    fetchPosts({ categories }).then((posts) => {
      theStore.dispatch(_updatePosts(posts));
    });
  });
});

// Loop
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

// Render
render(
  <Provider store={theStore}>
    <App/>
    <Hud/>
  </Provider>,
  document.getElementById('root'),
);
