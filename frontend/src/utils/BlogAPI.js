import Idgen from './Idgen'

const api = 'http://localhost:3001'

// Generate an ID for authorization
let token = localStorage.token
if (!token)
  token = localStorage.token = Idgen()

const headers = {
  'Authorization': token,
  'Content-Type': 'application/json',
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getPostsByCat = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const getPost = (postId) => 
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const votePost = (postId, voteMode) => 
  fetch(`${api}/posts/${postId}`, {
    method: 'post',
    headers,
    body: JSON.stringify({ option: voteMode}),
  }).then(res => res.json())

export const voteComment = (commentId, voteMode) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'post',
    headers,
    body: JSON.stringify({ option: voteMode }),
  }).then(res => res.json())

export const createPost = (post) =>
  fetch(`${api}/posts`, { 
    method: 'post',
    headers,
    body: JSON.stringify(post),
  }).then(res => res.json())

export const createComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'post',
    headers,
    body: JSON.stringify(comment),
  }).then(res => res.json())

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'delete',
    headers,
  }).then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'delete',
    headers,
  }).then(res => res.json())

export const updatePost = (postId, newData) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'put',
    headers,
    body: JSON.stringify(newData)
  }).then(res => res.json())

export const updateComment = (commentId, newData) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'put',
    headers,
    body: JSON.stringify(newData)
  }).then(res => res.json())