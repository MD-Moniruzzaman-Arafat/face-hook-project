import { actions } from '../actions';

export const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
};

export const ProfileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING:
      return { ...state, loading: true };
    case actions.profile.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        user: action.data.user,
        posts: action.data.posts,
      };
    case actions.profile.DATA_FETCHING_ERROR:
      return { ...state, loading: false, error: action.payload };
    case actions.profile.USER_DATA_EDITED:
      return {
        ...state,
        user: { ...state.user, ...action.data },
        loading: false,
      };
    case actions.profile.IMAGE_UPDATED:
      return { ...state, user: { ...state.user, image: action.payload } };
    default:
      return state;
  }
};
