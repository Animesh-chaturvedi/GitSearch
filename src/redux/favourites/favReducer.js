import { ADD_FAV, REMOVE_FAV, ADD_MANY } from "./favTypes";


const initialState = {
    favRepos: (localStorage.favRepos && localStorage.favRepos.length !== 0) ?  JSON.parse(localStorage.favRepos) : [],
}




const favReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV: return {
          favRepos: state.favRepos.concat(action.payload)
        }
    case REMOVE_FAV:{
      let fav = state.favRepos
      let reomved = fav.splice( action.payload, 1 )
      return {
        favRepos: fav
      }
    }
    case ADD_MANY: return{
      favRepos:state.favRepos.concat(action.payload)
    }
      default: return state;
    }
}


export default favReducer;