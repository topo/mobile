import React from 'react';
import { connect } from 'react-redux';

import Posts from './posts';

const Loading = () => (
    <div className="post loading">
      <div className="post-content">
        <p>Ça réfléchit ... Attends quelques petites secondes !</p>
      </div>
    </div>
);


const App = ({ posts }) => {
  let items = <Loading />;
  if (posts.length > 0) {
    items = <Posts />;
  }

  return (
    <div className="container">
      {items}
      <div className="post-as-container" id={`post-${items.length + 1}`}></div>
    </div>
  );
};
export default connect(
  state => ({ posts: state.posts }),
)(App, 'App');
