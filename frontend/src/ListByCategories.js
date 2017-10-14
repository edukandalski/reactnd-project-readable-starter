import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCategories } from './actions/categoriesActions'
import { initLoadPosts, loadPostsByCat, sortPosts, newPost } from './actions/postsActions'
import PostResume from './PostResume'
import sortBy from 'sort-by'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import Idgen from './utils/Idgen'
import PageNotFound from './PageNotFound'
import Loading from 'react-loading'
import PlusSquare from 'react-icons/lib/fa/plus-square-o'

class ListByCategories extends Component {
  state = {
    modalOpen: false
  }

  componentDidMount () {
    this.props.getAllCategories()
    this.props.iniLoadPosts()
    this.props.getPosts(this.props.match.params.category)
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
    const { categories, posts, match, voteAction } = this.props
    const { modalOpen } = this.state 
    let postArray = posts.data
    postArray.sort(sortBy(posts.sortBy))

    const categFound = categories.find(c => c.path === match.params.category)

    return (
      <div>
        
        { categFound ? (
          <div>
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
                      <input type='text' id='title' name='title' placeholder='Title' required />
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
                      <select id='category' name='category' value={match.params.category} disabled>
                        {categories.map(cat => (
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
              <div className='content-header'>
                Posts under {match.params.category}
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
        ) : (
          <PageNotFound />
        )}

      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }, ownProps) {
  return {
    categories: categories.data,
    posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () => dispatch(loadCategories()),
    iniLoadPosts: () => dispatch(initLoadPosts()),
    getPosts: (category) => dispatch(loadPostsByCat(category)),
    sortPostsBy: (field) => dispatch(sortPosts(field)),
    addPost: (post) => dispatch(newPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListByCategories) 