
export const UPDATE_POSTS = "UPDATE_POSTS"
export const SWITCH_TO_POST = "SWITCH_TO_POST"
export const SWITCH_MENU = "SWITCH_MENU"

export const updatePosts = (posts) => {
  return {
    type:UPDATE_POSTS,
    posts
  }
}

export const switchToPost = (id) => {
  return {
    type:SWITCH_TO_POST,
    id
  }
}

const initial = {
  category:null,
  isMenu:false,
  post:0,
  posts:[]
}

export const reducer = (state = initial, action) => {
  switch (action.type) {
    case UPDATE_POSTS:
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.posts
        ]
      }
    case SWITCH_TO_POST:
      return {
        ...state,
        post:action.id
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
