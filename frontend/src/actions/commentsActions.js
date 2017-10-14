import * as BlogAPI from '../utils/BlogAPI'
import * as types from './actionTypes'

export const initLoadComments = () => ({ type: types.INIT_LOAD_COMMENTS })

export const loadPostCommentsSucess = (postId, comments) => ( { type: types.LOAD_POST_COMMENTS_SUCESS,
                                                                postId,
                                                                comments, })

export const loadPostComments = postId => dispatch => BlogAPI.getPostComments(postId)
                                                        .then(comments => dispatch(loadPostCommentsSucess(postId, comments)))
                                                    
export const voteComment = (postId, commentId, voteMode) => dispatch => BlogAPI.voteComment(commentId, voteMode)
                                                                          .then(comment => dispatch(voteCommentSuccess(postId, comment)))

export const voteCommentSuccess = (postId, comment) => ({ type: types.VOTE_COMMENT_SUCCESS,
                                                          postId,
                                                          comment, })

export const newCommentSuccess = comment => ({ type: types.ADD_COMMENT_SUCCESS,
                                              comment, })
                                              
export const newComment = comment => dispatch => BlogAPI.createComment(comment)
                                                    .then(comment => dispatch(newCommentSuccess(comment)))

export const deleteCommentSuccess = comment => ({ type: types.DELETE_COMMENT_SUCCESS,
                                                  comment, })
                                                             
export const deleteComment = commentId => dispatch => BlogAPI.deleteComment(commentId)
                                                        .then(comment => dispatch(deleteCommentSuccess(comment)))

export const updateCommentSuccess = (postId, comment) => ({ type: types.UPDATE_COMMENT_SUCCESS,
                                                            postId,
                                                            comment, })
                                                  
export const updateComment = (postId, commentId, newData) => dispatch => BlogAPI.updateComment(commentId, newData)
                                                                    .then(comment => dispatch(updateCommentSuccess(postId, comment)))                                                  