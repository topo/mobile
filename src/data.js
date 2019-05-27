
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const SWITCH_TO_POST = 'SWITCH_TO_POST';
export const SWITCH_TO_CATEGORY = 'SWITCH_TO_CATEGORY';
export const SWITCH_MENU = 'SWITCH_MENU';
export const SET_TIMER = 'SET_TIMER';

export const _updatePosts = posts => ({
  type: UPDATE_POSTS,
  posts,
});
export const _updateCategories = categories => ({
  type: UPDATE_CATEGORIES,
  categories,
});

export const _switchToCategory = category => ({
  type: SWITCH_TO_CATEGORY,
  category,
});

export const _switchToPost = id => ({
  type: SWITCH_TO_POST,
  id,
});

export const _setTimer = timer => ({
  type: SET_TIMER,
  timer,
});

const initial = {
  isMenu: false,
  category: 'Coucou',
  post: 0,
  posts: [],
  categories: [],
  timer: 0,
};

export const reducer = (state = initial, action) => {
  switch (action.type) {
    case UPDATE_POSTS:
      return {
        ...state,
        posts: [
          ...action.posts,
        ],
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case SWITCH_TO_POST:
      return {
        ...state,
        post: action.id,
      };

    case SWITCH_TO_CATEGORY:
      return {
        ...state,
        category: action.category,
      };

    case SWITCH_MENU:
      return {
        ...state,
        isMenu: !(state.isMenu),
      };

    case SET_TIMER:
      return {
        ...state,
        timer: action.timer,
      };

    default:
      return state;
  }
};
