import {
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
} from "./repoTypes";

const initialState = {
  loading: false,
  repos: [],
  error: "",
  // favRepos:[],
};

const repoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REPOS_SUCCESS:
      return {
        loading: false,
        repos: action.payload,
        error: "",
        favRepos: state.favRepos
      };
    case FETCH_REPOS_FAILURE:
      return {
        loading: false,
        repos: [],
        error: action.payload,
        favRepos:state.favRepos
      };
    default:
      return state;
  }
};

export default repoReducer;
