import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { votePost } from './actions/postsActions'
import { initLoadComments, loadPostComments } from './actions/commentsActions'
import TimeFormatter from './utils/TimeFormatter'
import Loading from 'react-loading'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

class PostResume extends Component {
  componentDidMount () {
    this.props.iniLoadComments()
    this.props.getComments(this.props.postId)
  }

  sumComments = comments => comments.reduce((accumulator, currentValue) => accumulator + 1, 0)

  render () {
    const { posts, comments, postId, voteAction } = this.props
    const postArray = posts.filter(post => post.id === postId)
    const post = postArray[0]
    const totalComments = comments[postId] ? this.sumComments(comments[postId]) : 0   

    return (
      <div>
        <div>
          <Link to={`/${post.category}/${post.id}`} className='post-resume-title'>
            {post.title} 
          </Link>  
          <div className='post-resume-author' >
            by <span className='post-resume-author-name'>{post.author}</span> - <span className='post-resume-author-date'>{TimeFormatter(post.timestamp)}</span>
          </div>
        </div>
        <div className='post-resume-categ'>
          Category: {post.category} - Vote Score: {post.voteScore}
        </div>
        <div>
          {comments.loading === true ?
            <Loading delay={200} type='spin' color='#001381' />
          :
            <div className='post-resume-comments'>
              Total comments: {totalComments}
            </div>
          }
        </div>
        <div className='post-resume-vote' >
          <button className='icon-btn' onClick={() => voteAction(post.id, 'upVote')}>
            <ThumbsUp size={30} />
          </button>
          <button className='icon-btn' onClick={() => voteAction(post.id, 'downVote')}>
            <ThumbsDown size={30} />
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, comments }, ownProps) {
  return {
    posts: posts.data,
    comments,
    postId: ownProps.postId,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    iniLoadComments: () => dispatch(initLoadComments()),
    getComments: postId => dispatch(loadPostComments(postId)),
    voteAction: (postId, voteMode) => dispatch(votePost(postId, voteMode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostResume)