import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initLoadCategories, loadCategories } from './actions/categoriesActions'
import { initLoadPosts, loadPosts, sortPosts, newPost } from './actions/postsActions'
import PostResume from './PostResume'
import sortBy from 'sort-by'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import Idgen from './utils/Idgen'
import Loading from 'react-loading'
import PlusSquare from 'react-icons/lib/fa/plus-square-o'

class ListAll extends Component {
  state = {
    modalOpen: false
  }
  
  componentDidMount () {
    this.props.initLoadCategs()
    this.props.getAllCategories()
    this.props.iniLoadPosts()
    this.props.getAllPosts()
  }

  sortPostsBy = (field) => this.props.sortPostsBy(field)

  openCreateModal = () => {
    this.setState(() => ({
      modalOpen: true,
    }))
  }

  closeCreateModal = () => {
    this.setState(() => ({
      modalOpen: false,
    }))
  }

  handlePostSubmit = (e) => {
    e.preventDefault()
    const data = serializeForm(e.target, { hash: true })
    this.props.iniLoadPosts()
    this.props.addPost({ ...data,
                         id: Idgen(),
                         timestamp: Date.now() })
    this.closeCreateModal()
  }

  render () {
    const { categories, posts } = this.props
    const { modalOpen } = this.state 
    let postArray = posts.data
    postArray.sort(sortBy(posts.sortBy))

    return (
      <div>
        <div className='app-header'>
          Welcome to Udacity's Blog
        </div>

        <div>
          <ul className='categ-list'>
            <div className='content-header' >
              Categories
            </div>
            {categories.loading === true ? 
              <Loading delay={200} type='spin' color='#001381' />
            :
              <div>
                {categories.data.map(cat => (
                  <li key={cat.name} className='categ-list-item' >
                    <Link to={`/${cat.path}`} className='categ-list-link' >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </div>
            }
          </ul>
        </div>

        <div>
          <p>
            <button className='icon-btn new-object' onClick={() => this.openCreateModal()}>
              <PlusSquare size={60} />
            </button>
          </p>
          <Modal
            className='modal'
            overlayClassName='overlay'
            isOpen={modalOpen}
            onRequestClose={this.closeCreateModal}
            contentLabel='Modal'>
            <div>
              <form className='form-modal' onSubmit={this.handlePostSubmit}>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input className='input-title' type='text' id='title' name='title' placeholder='Title' required />
                </div>
                <div className='form-group'>
                  <label htmlFor='body'>Body</label>
                  <textarea rows='3' cols='100' maxLength='300' id='body' name='body' placeholder='Enter your post here...' required />
                </div>
                <div className='form-group'>
                  <label htmlFor='author'>Author</label>
                  <input type='text' id='author' name='author' placeholder='Author' required />
                </div>
                <div className='form-group'>
                  <label htmlFor='category'>Category</label>
                  <select id='category' name='category' required>
                    {categories.data.map(cat => (
                      <option key={cat.name} value={cat.path}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <button className='btn btn-submit'>Submit post</button>
              </form>
            </div>
          </Modal>
        </div>
        
        <ul>
          <div className='content-header' >
            Posts
          </div>
          <div className='sort-panel'>
            <span className='sort-panel-title'>Sort by:</span>
            <button className='btn' onClick={() => this.sortPostsBy('timestamp')}>
              Creation Date
            </button>
            <button className='btn' onClick={() => this.sortPostsBy('-voteScore')}>
              Vote Score
            </button>
          </div>
          {posts.loading === true ? 
            <Loading delay={200} type='spin' color='#001381' />
          :
            <div>
              {postArray.map(post => (
                <li key={post.id} className='post-list-item'>
                  <PostResume postId={post.id} />
                </li>
              ))}
            </div>
          } 
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories,
    posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    initLoadCategs: () => dispatch(initLoadCategories()),
    getAllCategories: () => dispatch(loadCategories()),
    iniLoadPosts: () => dispatch(initLoadPosts()),
    getAllPosts: () => dispatch(loadPosts()),
    sortPostsBy: (field) => dispatch(sortPosts(field)),
    addPost: (post) => dispatch(newPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAll)