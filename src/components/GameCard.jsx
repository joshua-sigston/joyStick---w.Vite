// imports
import React, { useState } from 'react'

import styled from 'styled-components'
import { motion } from 'framer-motion';
import { pop } from '../animations';

import { getGameDetails } from '../slices/detailsSlice'
import { getScreenshots } from '../slices/screenshotsSlicer'
import { useSelector, useDispatch } from 'react-redux';

const GameCard = ({game, openModal}) => {

  return (
    <Game onClick={() => {openModal(game.id)}}
          whileHover={{scale: 1.025}}
          id={game.id}
          variants={pop} 
          initial="hidden" 
          animate="show">
        <img src={game.background_image} alt={game.name} />
        <h3>{game.name}</h3>
        <p>{game.released}</p>
    </Game>
  )
}

const Game = styled(motion.div)`
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img {
        max-width: 100%;
        height: 300px;
        object-fite: cover;
    }
    cursor: pointer;
    transition: .3s ease-in
`

export default GameCard
