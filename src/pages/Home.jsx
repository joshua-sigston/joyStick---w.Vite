// imoprts
import React, { useEffect, useState } from 'react';

import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import { useSelector, useDispatch } from 'react-redux';
import { getPopularGames } from '../slices/popularGamesSlice';
import { getUpcomingGames } from '../slices/upcomingGameSlice';
import { getNewGames } from '../slices/newGamesSlice';

import { fadeIn } from '../animations';

//components
import GameCard from '../components/GameCard';
import GameDetailsModal from '../components/GameDetailsModal';

const Home = () => {
    const { isLoadingUpcoming, upcomingGames } = useSelector((store) => store.upcoming);
    const { isLoadingNew, newGames } = useSelector((store) => store.new);
    const { isLoadingPopular, popularGames } = useSelector((store) => store.popular);
    const { search } = useSelector((store) => store.search)
  
    const [gameID, setGameID] = useState()
    const disptach = useDispatch();
    

    useEffect(() => {
        disptach(getUpcomingGames())
        disptach(getNewGames())
        disptach(getPopularGames())
    }, []);

    const [toggleModal, setToggleModal] = useState(false)

    const handleOpenModal = (id) => {
      setGameID(id)
      setToggleModal(!toggleModal)
    }

    const handleCloseModal = () => {
      setToggleModal(!toggleModal)
    }
    
 if (isLoadingUpcoming || isLoadingPopular || isLoadingNew) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      <h2>Upcoming Games</h2>
      <Games>
        {upcomingGames.results.map((game) => (
            <GameCard game={game} key={game.id} openModal={handleOpenModal} />
        ))}
      </Games>
      <h2>New Games</h2>
      <Games>
        {newGames.results.map((game) => (
            <GameCard game={game} key={game.id} openModal={handleOpenModal} />
        ))}
      </Games>
      <h2>Popular Games</h2>
      <Games>
        {popularGames.results.map((game) => (
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
  display: grid;
  gap: 1em;
  text-align: center;

  h2 {
    padding: .3em .5em;
    border-radius: .5rem;
    background-color: #F67280;
  }

  @media (min-width: 768px) {
    text-align: left;
  }
`

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3em;
`

export default Home

