import * as BlogAPI from '../utils/BlogAPI'
import * as types from './actionTypes'

export const initLoadPosts = () => ({ type: types.INIT_LOAD_POSTS })

export const loadPostsSuccess = posts => ({ type: types.LOAD_POSTS_SUCCESS,
                                            posts, })

export const loadPosts = () => dispatch => BlogAPI.getAllPosts()
                                                    .then(posts => dispatch(loadPostsSuccess(posts)))

export const loadPostsByCat = (category) => dispatch => BlogAPI.getPostsByCat(category)
                                                          .then(posts => dispatch(loadPostsSuccess(posts)))

export const loadSinglePost = (postId) => dispatch => BlogAPI.getPost(postId)
                                                        .then(post => dispatch(loadPostsSuccess([ post ])))

export const sortPosts = (sortBy) => ({ type: types.SORT_POSTS, 
                                        sortBy, })

export const votePost = (postId, voteMode) => dispatch => BlogAPI.votePost(postId, voteMode)
                                                            .then(post => dispatch(votePostSuccess(post)))

export const votePostSuccess = post => ({ type: types.VOTE_POST_SUCCESS,
                                          post, })
                                          
export const newPostSuccess = post => ({ type: types.ADD_POST_SUCCESS,
                                         post, })

export const newPost = post => dispatch => BlogAPI.createPost(post)
                                              .then(post =>dispatch(newPostSuccess(post)))

export const deletePostSuccess = post => ({ type: types.DELETE_POST_SUCCESS,
                                            post, })

export const deletePost = postId => dispatch => BlogAPI.deletePost(postId)
                                                  .then(post => dispatch(deletePostSuccess(post)))
                                                  
export const updatePostSuccess = post => ({ type: types.UPDATE_POST_SUCCESS,
                                            post, })
                                            
export const updatePost = (postId, newData) => dispatch => BlogAPI.updatePost(postId, newData)
                                                              .then(post => dispatch(updatePostSuccess(post)))                                            