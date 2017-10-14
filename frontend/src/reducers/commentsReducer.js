import * as types from '../actions/actionTypes'
import * as initials from './initialState'
import sortBy from 'sort-by'

const commentsReducer = (state = initials.initialStateComments, action) => {
  switch (action.type) {
    case types.INIT_LOAD_COMMENTS:
      return {
        ...state,
        loading: true,
      }
    case types.LOAD_POST_COMMENTS_SUCESS:
      return {
        ...state,
        loading: false,
        [action.postId]: action.comments,
      }
    case types.VOTE_COMMENT_SUCCESS:
      const comments = state[action.postId].filter(c => c.id !== action.comment.id)
      comments.push(action.comment)
      comments.sort(sortBy('timestamp'))
      return {
        ...state,
        [action.postId]: comments,
      }
    case types.ADD_COMMENT_SUCCESS:
      const clone = state[action.comment.parentId].slice()
      clone.push(action.comment)
      return {
        ...state,
        loading: false,
        [action.comment.parentId]: clone,
      }
    case types.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        [action.comment.parentId]: state[action.comment.parentId].filter(c => c.id !== action.comment.id)
      }
    case types.UPDATE_COMMENT_SUCCESS:
      const updatedData = state[action.postId].filter(c => c.id !== action.comment.id)
      updatedData.push(action.comment)
      updatedData.sort(sortBy('timestamp'))
      return {
        ...state,
        loading: false,
        [action.postId]: updatedData,
      }
    default:
      return state
  }
} 

export default commentsReducer