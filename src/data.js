
export const UPDATE_POSTS = "UPDATE_POSTS"
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES"
export const SWITCH_TO_POST = "SWITCH_TO_POST"
export const SWITCH_TO_CATEGORY = "SWITCH_TO_CATEGORY"
export const SWITCH_MENU = "SWITCH_MENU"

export const updatePosts = (posts) => {
  return {
    type:UPDATE_POSTS,
    posts
  }
}
export const updateCategories = (categories) => {
  return {
    type:UPDATE_CATEGORIES,
    categories
  }
}

export const switchToCategory = (category) => {
  return {
    type:SWITCH_TO_CATEGORY,
    category
  }
}

export const switchToPost = (id) => {
  return {
    type:SWITCH_TO_POST,
    id
  }
}

const initial = {
  isMenu:false,
  category:'Coucou',
  post:0,
  posts:[],
  categories:[]
}

export const reducer = (state = initial, action) => {
  switch (action.type) {
    case UPDATE_POSTS:
      return {
        ...state,
        posts: [
          ...action.posts
        ]
      }

    case UPDATE_CATEGORIES:
      let st =  {
        ...state,
        categories: [ ...action.categories ]
      }
      return st

    case SWITCH_TO_POST:
      return {
        ...state,
        post: action.id
      }

    case SWITCH_TO_CATEGORY:
      return {
        ...state,
        category: action.category
      }

    case SWITCH_MENU:
      let oldMenu = state.isMenu;
      return {
        ...state,
        isMenu: (oldMenu) ? false : true
      }

    default:
      return state
  }
}
