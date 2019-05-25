import React from 'react'
import { connect } from 'react-redux'

import raf from 'raf'

import { Link } from './ui'

// Stolen from https://gist.github.com/gre/1650294
function easeOutCubic (t) { return (--t)*t*t+1 }

function updateScroll(id) {
  let el = document.getElementById(id);
  if (el) {
    let currentOffset = window.pageYOffset || document.documentElement.scrollTop || 0;
    const targetOffset = el.offsetTop || 0;
    const scrollDifference = targetOffset-currentOffset;

    var scrollPosition = currentOffset;
    let increment = .01;
    var position = 0; //percentage (0 to 1)

    // Animation loop
    let animation = requestAnimationFrame(goToTarget)

    function goToTarget() {
      position += increment;
      let positionInFunction = easeOutCubic(position);

      scrollPosition = currentOffset+positionInFunction*scrollDifference;

      if (positionInFunction<1) {
        window.scrollTo(0, scrollPosition)
        requestAnimationFrame(goToTarget)

      } else {
        cancelAnimationFrame(animation)
        window.scrollTo(0,targetOffset)
        currentOffset = targetOffset; // dunno why, but this has to be updated
      }
    }
  }
}

const PostsContainer = ({ posts, activePost }) => {

  return posts.map((post, index) => {
    let id = `post-${index}`
    let authors = post.coauthors.map(author => (
      <>
        <img className="author-image" src={author.avatar} />
        <span className="author">{author.name}</span>
      </>
    ))

    if (activePost===index) {updateScroll(id);}

    return (
      <div
        className={"post "+ ((activePost===index) ? 'active' : 'inactive')}
        key={id}
        id={id}
        style={{backgroundImage:`url(${post.image})`}}>

        <div className="post-container">
          <Link className="post-content" href={post.link}>
            <h2 class="kicker">{post.meta.kicker||null}</h2>
            <br />
            <h1 class="title">{post.title.rendered}</h1>
            <p class="description">
              <span
                dangerouslySetInnerHTML={{__html: post.excerpt.rendered||null}}
              />
              {authors}
            </p>
          </Link>
        </div>

      </div>
    )
  });
}
const Posts = connect(
  state => {
    return {
      activePost:state.post,
      posts:state.posts
    }
  }
)(PostsContainer, 'Posts')


const App = () => {
  let items = <div>Loading</div>
  try {
    items = <Posts />;
  } catch (e) {}

  return (
    <div className="container">
      {items}
      <div className="post-as-container" id={`post-${items.length+1}`}></div>
    </div>
  )
}
export default App
