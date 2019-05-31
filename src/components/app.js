import React from 'react';
import { connect } from 'react-redux';
import { disableBodyScroll } from 'body-scroll-lock';


// Stolen from https://gist.github.com/gre/1650294
/*eslint-disable */
function easeOutCubic(t) { return (--t) * t * t + 1; }
/*eslint-disable */

// Animate scroll
function updateScroll(id) {
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

const Loading = () => {
  return (
    <div className="post loading">
      <div className="post-content">
        <p>Ça réfléchit ... Attends quelques petites secondes !</p>
      </div>
    </div>
  )
}

const CoAuthors = ({coauthors}) => coauthors.map((author) => {
  if (author.avatar && !author.avatar.startsWith('https://topolitique.ch')) {
    author.avatar = "assets/coauthor.png";
  };
  return (
    <span key={author.name} >
      <img className="author-image" src={author.avatar} alt="-"/>
      <span className="author">{author.name}</span>
    </span>
  );
});

const PostsContainer = ({ posts, activePost }) => posts.map((post, index) => {

  const id = `post-${index}`;

  if (activePost === index) { updateScroll(id); }

  return (
      <div
        className={`post ${(activePost === index) ? 'active' : 'inactive'}`}
        key={id}
        id={id}
        style={ (post.image && post.image.startsWith('https://')) ? { backgroundImage: `url(${post.image})` } : null}>

        <div className="post-container">
          <a className="post-content" href={post.link}>
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
const Posts = connect(
  state => ({
    activePost: state.post,
    posts: state.posts,
  }),
)(PostsContainer, 'Posts');


const App = ({posts}) => {
  const targetRef = React.createRef();
  const targetElement = targetRef.current;

  // PROBLEM: works only on desktop
  disableBodyScroll(targetElement);

  let items = <Loading />;
  if (posts.length>0) {
    try {
      items = <Posts />;
    } catch (e) {}
  }

  return (
    <div className="container" ref={targetElement}>
      {items}
      <div className="post-as-container" id={`post-${items.length + 1}`}></div>
    </div>
  );
};
export default connect(
  state => ({posts:state.posts})
)(App, 'App');
