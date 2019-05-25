
const apiUrl = "http://topolitique.ch/beta/wp-json/wp/v2/"
const postsUrl = `${apiUrl}posts/`


export const fetchPosts = (opts) => {
  return new Promise(function(resolve, reject) {
    fetch(postsUrl)
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
  });
}
