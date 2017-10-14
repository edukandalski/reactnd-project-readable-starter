import * as types from '../actions/actionTypes'
import * as initials from './initialState'

const categoriesReducer = (state = initials.initalStateCategories, action) => {
  switch (action.type) {
    case types.INIT_LOAD_CATEGORIES:
      return {
        ...state,
        loading: true,
      }
    case types.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.categories,
      }
    default:
      return state
  }
} 

export default categoriesReducer