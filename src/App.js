import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={4}
        color='#f11946'
        progress={this.state.progress}
        />
        <Routes>
          <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='general' pageSize={this.pageSize} country='in' category='General' />}></Route>
          <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='business' pageSize={this.pageSize} country='in' category='Business' />}></Route>
          <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='entertainment' pageSize={this.pageSize} country='in' category='Entertainment' />}></Route>
          <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='health' pageSize={this.pageSize} country='in' category='Health' />}></Route>
          <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='science' pageSize={this.pageSize} country='in' category='Science' />}></Route>
          <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='sports' pageSize={this.pageSize} country='in' category='Sports' />}></Route>
          <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='technology' pageSize={this.pageSize} country='in' category='Technology' />}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}

