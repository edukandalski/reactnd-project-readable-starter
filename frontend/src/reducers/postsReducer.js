import * as types from '../actions/actionTypes'
import * as initials from './initialState'

const postsReducer = (state = initials.initialStatePosts, action) => {
  switch (action.type) {
    case types.INIT_LOAD_POSTS:
      return {
        ...state,
        loading: true,
      }
    case types.LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.posts,
      }
    case types.SORT_POSTS:
      return {
        ...state,
        sortBy: action.sortBy,
      }
    case types.VOTE_POST_SUCCESS:
      const newData = state.data.filter(p => p.id !== action.post.id)
      newData.push(action.post)
      return {
        ...state,
        data: newData,
      }
    case types.ADD_POST_SUCCESS:
      const clone = state.data.slice()
      clone.push(action.post)
      return {
        ...state,
        loading: false,
        data: clone,
      }
    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        data: state.data.filter(p => p.id !== action.post.id),
      }
    case types.UPDATE_POST_SUCCESS:
      const updatedData = state.data.filter(p => p.id !== action.post.id)
      updatedData.push(action.post)
      return {
        ...state,
        loading: false,
       data: updatedData,
      }
    default:
      return state
  }
} 

export default postsReducer