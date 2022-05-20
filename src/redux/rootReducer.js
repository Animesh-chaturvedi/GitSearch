import { combineReducers } from "redux";
import repoReducer from './repos/repoReducer'
import favReducer from "./favourites/favReducer";


const rootReducer = combineReducers({
    repo: repoReducer,
    fav: favReducer,
})
// const rootReducer = repoReducer;

export default rootReducer;