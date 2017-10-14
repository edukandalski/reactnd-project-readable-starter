import * as BlogAPI from '../utils/BlogAPI'
import * as types from './actionTypes'

export const initLoadCategories = () => ({ type: types.INIT_LOAD_CATEGORIES })

export const loadCategoriesSuccess = categories => ({ type: types.LOAD_CATEGORIES_SUCCESS,
                                                      categories })

export const loadCategories = () => dispatch => BlogAPI.getAllCategories()
                                                          .then(categories => dispatch(loadCategoriesSuccess(categories)))