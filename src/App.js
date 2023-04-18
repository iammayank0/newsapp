import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


  const App=()=> {
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        />
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey}  key='general' pageSize={pageSize} country='in' category='General' />}></Route>
          <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey}  key='business' pageSize={pageSize} country='in' category='Business' />}></Route>
          <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey}  key='entertainment' pageSize={pageSize} country='in' category='Entertainment' />}></Route>
          <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey}  key='health' pageSize={pageSize} country='in' category='Health' />}></Route>
          <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey}  key='science' pageSize={pageSize} country='in' category='Science' />}></Route>
          <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey}  key='sports' pageSize={pageSize} country='in' category='Sports' />}></Route>
          <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey}  key='technology' pageSize={pageSize} country='in' category='Technology' />}></Route>
        </Routes>
        </Router>
      </div>
    )
  
}

export default App