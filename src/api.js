
const apiUrl = 'https://topolitique.ch/beta/wp-json/wp/v2/';
const topoApiUrl = 'https://topolitique.ch/beta/wp-json/topo/v1/';

const postsUrl = `${apiUrl}posts/`;
const uiUrl = `${topoApiUrl}ui/`;
const categoriesUrl = `${apiUrl}categories/?orderby=count&order=desc&per_page=30`;

export const fetchPosts = (opts) => {
  let catArgs = '';
  let catExcludeArgs = '';
  let cache = '';

  if (opts.categories) {
    catArgs = '?categories=';
    catExcludeArgs = '&categories_exclude=';

    const { categories } = opts;
    categories.forEach((cat) => {
      const { name, id } = cat;
      if (name.includes('Non répertorié')) {
        catExcludeArgs += `${id},`;
      } else {
        catArgs += `${id},`;
      }
    });
  }

  if (opts.noCache) {
    cache = '&noCache=true';
  }

  const url = postsUrl + catArgs + catExcludeArgs + cache;
  return new Promise(((resolve, reject) => {
    fetch(url)
      .catch((e) => { reject(e); })
      .then(response => response.json())
      .then((data) => {
        resolve(data);
      });
  }));
};

export const fetchCustomUserInterface = () => new Promise(((resolve, reject) => {
  fetch(uiUrl)
    .catch((e) => { reject(e); })
    .then(response => response.json())
    .then((data) => {
      resolve(data);
    });
}));

export const fetchCategories = () => new Promise(((resolve, reject) => {
  fetch(categoriesUrl)
    .catch((e) => { reject(e); })
    .then(response => response.json())
    .then((data) => {
      resolve(data);
    });
}));
