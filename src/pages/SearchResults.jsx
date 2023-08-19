import React, {useState} from 'react'

import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'

import GameCard from '../components/GameCard'
import GameDetailsModal from '../components/GameDetailsModal'

const SearchResults = () => {
    const { search, isLoadingSearch } = useSelector((store) => store.search)

    const [toggleModal, setToggleModal] = useState(false)
    const [gameID, setGameID] = useState()

    const handleOpenModal = (id) => {
      setGameID(id)
      setToggleModal(!toggleModal)
    }

    const handleCloseModal = () => {
      setToggleModal(!toggleModal)
    }

    if (isLoadingSearch) {
        return (
          <div className='loading'>
            <h1>Loading...</h1>
          </div>
        );
      }
      
  return (
    <GameList>
    <Games>
      {search.results.map((game) => (
          <GameCard game={game} key={game.id} openModal={handleOpenModal} />
      ))}
    </Games>
    <AnimatePresence mode='wait'>
    {toggleModal && <GameDetailsModal 
                        gameID={gameID}
                        toggleModal={toggleModal} 
                        openModal={handleOpenModal}
                        closeModal={handleCloseModal}/>}
    </AnimatePresence>
  </GameList>
  )
}

const GameList = styled(motion.div)`
  padding: 1em;
  width: 100%;
`

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3em;
`


export default SearchResults
