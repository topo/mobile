import React from 'react';
import { connect } from 'react-redux';


import { _switchToDisplayPost } from '../data';
// Stolen from https://gist.github.com/gre/1650294
/*eslint-disable */
const easeOutCubic = (t) => { return (--t) * t * t + 1; }
/*eslint-disable */

// Animate scroll
const updateScroll = (id) => {
  const el = document.getElementById(id);
  if (el) {
    let currentOffset = window.pageYOffset||document.documentElement.scrollTop||0;
    const targetOffset = el.offsetTop || 0;
    const scrollDifference = targetOffset - currentOffset;

    let scrollPosition = currentOffset;
    const increment = 0.02;
    let position = 0; // percentage (0 to 1)

    // Animation loop
    const animation = requestAnimationFrame(goToTarget);

    function goToTarget() {
      position += increment;
      const positionInFunction = easeOutCubic(position);

      scrollPosition = currentOffset + positionInFunction * scrollDifference;

      if (positionInFunction < 1) {
        window.scrollTo(0, scrollPosition);
        requestAnimationFrame(goToTarget);
      } else {
        cancelAnimationFrame(animation);
        // window.scrollTo(0,targetOffset)
        currentOffset = scrollPosition; // dunno why, but this has to be updated
      }
    }
  }
}

const CoAuthors = ({coauthors}) => coauthors.map((author) => {
  let avatar = <img className="author-image" src={author.avatar} alt={author.name} />
  if (author.avatar && !author.avatar.startsWith('https://topolitique.ch')) {
    author.avatar = "assets/coauthor.png";
  } else if (!author.avatar) {
    avatar = <span></span>;
  }
  return (
    <span key={author.name} >
      {avatar}
      <span className="author">{author.name}</span>
    </span>
  );
});

const PostsContainer = ({
  posts, 
  activePost, 
  setDisplayPost,
}) => posts.map((post, index) => {

  const id = `post-${index}`;

  if (activePost === index) { updateScroll(id); }

  function choosePost(e, post) {
    e.preventDefault()
    setDisplayPost(post)
  }

  return (
      <div
        className={`post ${(activePost === index) ? 'active' : 'inactive'}`}
        key={id}
        id={id}
        style={ (post.image && post.image.startsWith('https://')) ? { backgroundImage: `url(${post.image})` } : null}>

        <div className="post-container">
          <a className="post-content" onClick={(e) => choosePost(e, post)}>
            <h2 className="kicker">{post.meta.kicker}</h2>
            <br />
            <h1 className="title">{post.title.rendered}</h1>
            <p className="description">
              <span
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <CoAuthors coauthors={post.coauthors} />
            </p>
          </a>
        </div>

      </div>
  );
});
export default connect(
  state => ({
    activePost: state.post,
    posts: state.posts,
  }),
  dispatch => ({
    setDisplayPost: (post) => dispatch(_switchToDisplayPost(post))
  })
)(PostsContainer, 'Posts');
