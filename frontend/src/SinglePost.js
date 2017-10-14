import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCategories } from './actions/categoriesActions'
import { initLoadPosts, loadSinglePost, votePost, deletePost, updatePost } from './actions/postsActions'
import { initLoadComments, loadPostComments, voteComment, newComment, deleteComment, updateComment } from './actions/commentsActions'
import TimeFormatter from './utils/TimeFormatter'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import Idgen from './utils/Idgen'
import PageNotFound from './PageNotFound'
import Loading from 'react-loading'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'
import Edit from 'react-icons/lib/fa/edit'
import Trash from 'react-icons/lib/fa/trash-o'
import CommentAdd from 'react-icons/lib/ti/document-add'

class SinglePost extends Component {
  state = {
    modalPostEditOpen: false,
    modalCommentCreateOpen: false,
    modalCommentEditOpen: false,
    editComment: {},
  }

  openCreateModal = () => {
    this.setState(() => ({
      modalCommentCreateOpen: true,
    }))
  }

  closeCreateModal = () => {
    this.setState(() => ({
      modalCommentCreateOpen: false,
    }))
  }

  openCommentEditModal = (comment) => {
    this.setState(() => ({
      modalCommentEditOpen: true,
      editComment: comment,
    }))
  }

  closeCommentEditModal = () => {
    this.setState(() => ({
      modalCommentEditOpen: false,
    }))
  }

  openPostEditModal = () => {
    this.setState(() => ({
      modalPostEditOpen: true,
    }))
  }

  closePostEditModal = () => {
    this.setState(() => ({
      modalPostEditOpen: false,
    }))
  }

  handleCommentSubmit = (e) => {
    e.preventDefault()
    const data = serializeForm(e.target, { hash: true })
    this.props.iniLoadComments()
    this.props.addComment({ ...data,
                         id: Idgen(),
                         timestamp: Date.now(),
                         parentId: this.props.posts.data[0].id, })
    this.closeCreateModal()
  }

  handleCommentEdit = (e) => {
    const { editComment } = this.state
    e.preventDefault()
    const data = serializeForm(e.target, { hash: true })
    this.props.iniLoadComments()
    this.props.editComment( editComment.parentId, editComment.id,
                           { ...data,
                             timestamp: Date.now(), 
                           })
    this.closeCommentEditModal()
  }

  handlePostSubmit = (e) => {
    const { posts } = this.props
    const post = posts.data[0]
    e.preventDefault()
    const data = serializeForm(e.target, { hash: true })
    this.props.iniLoadPosts()
    this.props.editPost(post.id, data)
    this.closePostEditModal()
  }

  componentDidMount () {
    this.props.getAllCategories()
    this.props.iniLoadPosts()
    this.props.getPost(this.props.match.params.post_id)
    this.props.iniLoadComments()
    this.props.getComments(this.props.match.params.post_id)
  }  

  sumComments = comments => comments.reduce((accumulator, currentValue) => accumulator + 1, 0)                                   

  render () {
    const { categories, posts, comments, match, voteAction, voteCommentAction, history, delComment, delPost } = this.props
    const postId = match.params.post_id
    const { modalPostEditOpen, modalCommentCreateOpen, modalCommentEditOpen, editComment } = this.state 
    const post = posts.data[0]
    const filterComments = comments[postId] 
    const totalComments = filterComments ? this.sumComments(filterComments) : 0

    return (
      <div>
        {post && post.id ? (
          <div className='container'>
            {posts.loading === true ?
              <Loading delay={200} type='spin' color='#001381' />
            :
              <div>
                <div className='content-header'>
                  {post.title}
                </div>
                <div className='post-resume-author'>
                  by <span className='post-resume-author-name'>{post.author}</span> - <span className='post-resume-author-date'>{TimeFormatter(post.timestamp)}</span>
                </div>
                <div className='post-body' >
                  {post.body}
                </div>
                <div className='post-resume-comments' >
                  Total comments: {totalComments}
                </div>
                <div className='post-resume-categ' >
                  Category: {post.category}
                </div>
                <div className='post-score' >
                  Current score: {post.voteScore}
                </div>

                <div className='post-btn-container'>
                  <button className='icon-btn' onClick={() => voteAction(post.id, 'upVote')}>
                    <ThumbsUp size={30}/>
                  </button>
                  <button className='icon-btn' onClick={() => voteAction(post.id, 'downVote')}>
                    <ThumbsDown size={30}/>
                  </button>
                  <button className='icon-btn' onClick={() => this.openPostEditModal()}>
                    <Edit size={30}/>
                  </button>              
                  <button className='icon-btn' onClick={() => {
                    delPost(post.id)
                    history.push('/')  
                  }}>
                    <Trash size={30}/>
                  </button>
                </div>
              </div>
            }
            
            <Modal
              className='modal'
              overlayClassName='overlay'
              isOpen={modalPostEditOpen}
              onRequestClose={this.closePostEditModal}
              contentLabel='Modal'>
              <div>
                <form className='form-modal' onSubmit={this.handlePostSubmit}>
                  <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' name='title' placeholder='Title' required defaultValue={post.title} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='body'>Body</label>
                    <textarea rows='3' cols='100' maxLength='300' id='body' name='body' placeholder='Enter your post here...' required defaultValue={post.body} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='author'>Author</label>
                    <input type='text' id='author' name='author' placeholder='Author' disabled value={post.author} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='category'>Category</label>
                    <select id='category' name='category' disabled value={post.category} >
                      {categories.map(cat => (
                        <option key={cat.name} value={cat.path}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <button className='btn btn-submit'>Submit post</button>
                </form>
              </div>
            </Modal>

            <div>
              <button className='icon-btn new-object' onClick={() => this.openCreateModal()}>
                <CommentAdd size={60}/>
              </button>
              <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={modalCommentCreateOpen}
                onRequestClose={this.closeCreateModal}
                contentLabel='Modal'>
                <div>
                  <form className='form-modal' onSubmit={this.handleCommentSubmit}>
                    <div className='form-group'>
                      <label htmlFor='author'>Author</label>
                      <input type='text' id='author' name='author' placeholder='Author' required />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='body'>Body</label>
                      <textarea rows='3' cols='100' maxLength='300' id='body' name='body' placeholder='Enter your post here...' required />
                    </div>
                    <button className='btn btn-submit'>Submit comment</button>
                  </form>
                </div>
              </Modal>
            </div>

            <ul>
              {comments.loading === true ?
                <Loading delay={200} type='spin' color='#001381' />
              :
              <div>
                <div className='content-header' >
                  Comments
                </div>
                  {filterComments && filterComments.map(comment => (
                    <li key={comment.id} className='comment-list-item' >
                      <div className='comment-body' >
                        {comment.body}
                      </div>
                      <div className='comment-author' >
                        By: <span className='comment-author-name' >{comment.author}</span> - <span className='comment-author-date'>{TimeFormatter(comment.timestamp)}</span>
                      </div>
                      <div className='comment-score'>
                        Current score: {comment.voteScore}
                      </div>
                      <div className='div-btn-organizer'>
                        <button className='icon-btn' onClick={() => voteCommentAction(post.id, comment.id, 'upVote')}>
                          <ThumbsUp size={30}/>
                        </button>
                        <button className='icon-btn' onClick={() => voteCommentAction(post.id, comment.id, 'downVote')}>
                          <ThumbsDown size={30}/>
                        </button>
                        <button className='icon-btn' onClick={() => this.openCommentEditModal(comment) }>
                          <Edit size={30}/>
                        </button>                    
                        <button className='icon-btn' onClick={() => delComment(comment.id) }>
                          <Trash size={30}/>
                        </button>   
                      </div>
                    </li>
                  ))}
                </div>
              }         
            </ul>
            <Modal
              className='modal'
              overlayClassName='overlay'
              isOpen={modalCommentEditOpen}
              onRequestClose={this.closeCommentEditModal}
              contentLabel='Modal'>
              <div>
                <form className='form-modal' onSubmit={this.handleCommentEdit}>
                  <div className='form-group'>
                    <label htmlFor='author'>Author</label>
                    <input type='text' id='author' name='author' placeholder='Author' disabled value={editComment.author} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='body'>Body</label>
                    <textarea rows='3' cols='100' maxLength='300' id='body' name='body' placeholder='Enter your post here...' required defaultValue={editComment.body} />
                  </div>
                  <button className='btn btn-submit'>Submit comment</button>
                </form>
              </div>
            </Modal>
          </div>
        ) : (
          <PageNotFound />
        )}
      </div>
    )
  }
}

function mapStateToProps ({categories, posts, comments}, ownProps) {
  return {
    categories: categories.data,
    posts,
    comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () => dispatch(loadCategories()),
    iniLoadPosts: () => dispatch(initLoadPosts()),
    getPost: postId => dispatch(loadSinglePost(postId)),
    iniLoadComments: () => dispatch(initLoadComments()),
    getComments: postId => dispatch(loadPostComments(postId)),
    voteAction: (postId, voteMode) => dispatch(votePost(postId, voteMode)),
    voteCommentAction: (postId, commentId, voteMode) => dispatch(voteComment(postId, commentId, voteMode)),
    addComment: comment => dispatch(newComment(comment)),
    delComment: commentId => dispatch(deleteComment(commentId)),
    delPost: postId => dispatch(deletePost(postId)),
    editComment: (postId, commentId, data) => dispatch(updateComment(postId, commentId, data)),
    editPost: (postId, data) => dispatch(updatePost(postId, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)