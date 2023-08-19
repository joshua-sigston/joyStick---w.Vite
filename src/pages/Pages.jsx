import React from 'react'

import SearchResults from './SearchResults'
import Home from './Home'

import {Route, Routes, useLocation} from 'react-router-dom'

function Pages() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/search-results' element={<SearchResults />} />
        </Routes>
    </div>
  )
}

export default Pages
