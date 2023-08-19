import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import styled from 'styled-components'

import logo from '../img/logo.png'

import { getSearch } from '../slices/searchGamesSlice'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

const Nav = () => {
  const [ input, setInput ] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  const handleSearch = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatch(searchValue('test'))
    dispatch(getSearch(input))
    navigate('/search-results')
  }

  return (
    <Navigation>
      <Link to={'/'}>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
      </Link>
      <form className="search_container" onSubmit={handleSubmit}>
        <input type="text" onChange={handleSearch}/>
        <button>Search</button>
      </form>
    </Navigation>
  )
}

const Navigation = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  width: clamp(300px, 40%, 400px);

  input {
    border: none;
    height: 1.9em;
    padding-inline: .5em;
    border-radius: .5em;
  }

  button:hover {
    cursor: pointer;
  }
`
const Logo = styled(motion.div)`
  max-width: 10rem;

  img {
    width: 2.5rem;
  }
`

export default Nav
