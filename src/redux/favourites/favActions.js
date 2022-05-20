import { ADD_FAV, REMOVE_FAV, ADD_MANY } from "./favTypes"


export const addFav = repo => {
    return{
        type:ADD_FAV,
        payload: repo
    }
}

export const removeFav = repo => {
    return{
        type:REMOVE_FAV,
        payload: repo
    }
}

export const addMany = repos => {
  return{
    type:ADD_MANY,
    payload: repos
  }
}