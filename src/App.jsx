import { useState } from 'react'

import GlobalStyles from './components/GlobalStyles';
import styled from 'styled-components'

import { BrowserRouter } from 'react-router-dom';
import SearchResults from './pages/SearchResults';

// pages
import Pages from './pages/Pages';
import Nav from './components/Nav';

function App() {

  return (
    <AppContainer>
      <BrowserRouter>
        <GlobalStyles />
        <Nav />
        <Pages />
      </BrowserRouter>
  </AppContainer>
  )
}

const AppContainer = styled.div`
  background-color: whitesmoke;
  padding: 1em;
`

export default App
