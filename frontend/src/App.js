import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListAll from './ListAll'
import ListByCategories from './ListByCategories'
import SinglePost from './SinglePost'
import './App.css'

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path='/' component={ListAll} /> 
        <Route exact path='/:category' component={ListByCategories} /> 
        <Route exact path='/:category/:post_id' component={SinglePost} />
      </div>
    )
  }
}

export default App
