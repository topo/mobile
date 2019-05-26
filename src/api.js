
const apiUrl = "https://topolitique.ch/beta/wp-json/wp/v2/"
const postsUrl = `${apiUrl}posts/`
const categoriesUrl = `${apiUrl}categories/?orderby=count&order=desc&per_page=30`

export const fetchPosts = (opts) => {

  let cat_args = ""
  let cat_exclude_args = ""

  if (opts.categories) {
    cat_args = "?categories="
    cat_exclude_args = "&categories_exclude="

    let { categories } = opts;
    categories.forEach(cat => {
      let {name, id} = cat;
      if (name.includes('Non répertorié')) {
        cat_exclude_args+=`${id},`
      } else {
        cat_args+=`${id},`
      }
    })
  }
  let url = postsUrl+cat_args+cat_exclude_args
  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
  });
}

export const fetchCategories = (opts) => {
  return new Promise(function(resolve, reject) {
    fetch(categoriesUrl)
      .then(response => response.json())
      .then(data => {
        resolve(data)
      })
  });
}
