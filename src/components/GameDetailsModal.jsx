import React, { useEffect } from 'react'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import ReactDOM from 'react-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/sea-green';


// img imports
import apple from '../img/apple.svg'
import gamepad from '../img/gamepad.svg'
import nintendo from '../img/nintendo.svg'
import playstation from '../img/playstation.svg'
import steam from '../img/steam.svg'
import xbox from '../img/xbox.svg'

import { useSelector, useDispatch } from 'react-redux';
import { getGameDetails } from '../slices/detailsSlice'
import { getScreenshots } from '../slices/screenshotsSlicer';

const getPlatform = (platform) => {
    switch (platform) {
        case "PlayStation 3":
          return playstation;
        case "PlayStation 4":
          return playstation;
        case "PlayStation 5":
          return playstation;
        case "Xbox 360":
          return xbox;
        case "Xbox One":
          return xbox;
        case "Xbox Series S/X":
          return xbox;
        case "PC":
          return steam;
        case "Nintendo Switch":
          return nintendo;
        case "iOS":
          return apple;
        default:
          return gamepad;
      }
}

const modalAnimation ={ 
    hidden: {
        opacity: 0,
    }, 
    show: {
        opacity: 1, 
        transition: {
            duration: .5,
            when: 'beforeChildren',
            staggerChildren: 1
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 1
        }
    }
}

const detailsAnimation = {
    hidden: {
       opacity: 0,
       x: 200
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: .5,
        }
    }
}

const GameDetailsModal = ({toggleModal, closeModal, gameID}) => {
    const { gameDetails, isLoadingDetails } = useSelector((store) => store.details);
    const { screenshots, isLoadingShots } = useSelector((store) => store.screenshots)
    const dispatch = useDispatch();
    console.log(screenshots)
    useEffect(() => {
        dispatch(getGameDetails(gameID))
        dispatch(getScreenshots(gameID))
    }, []);

    if(!toggleModal) return null

    if (isLoadingDetails) {
        return (
          <div className='loading'>
            <h1>Loading...</h1>
          </div>
        );
      }
    
  return ReactDOM.createPortal(
    <ModalContainer 
                    variants={modalAnimation}
                    initial="hidden"
                    animate="show"
                    exit="exit">
        <DetailsContainer variants={detailsAnimation}>
            <Stats>
                <Rating>
                    <h4>{gameDetails.name}</h4>
                    <p>Rating: {gameDetails.rating}</p>
                </Rating>
                <Info>
                    <h3>Platforms</h3>
                    <PlatformList>
                        <Platforms>
                            {gameDetails.platforms.map((platform) => (
                                 <img key={platform.platform.name} src={getPlatform(platform.platform.name)} alt={platform.platform.name} />
                            ))}
                        </Platforms>
                    </PlatformList>
                </Info>
            </Stats>
            <Media>
                <img src={gameDetails.background_image} alt="img" />
            </Media>
            <Description>
                {gameDetails.description_raw}
            </Description>
            <Gallery>
                <Splide options={{
                    perPage: 4, 
                    breakpoints: { 375: {perPage : 1,}, 900:{perPage: 2}},
                    pagination: false, 
                    drag: 'free', 
                    gap: '1em'
                }}>
                {screenshots.results.map((screen) => (
                    <SplideSlide>
                        <img src={screen.image} key={screen.id} alt="img" />
                    </SplideSlide>
                ))}
                </Splide>
            </Gallery>
            <button onClick={closeModal} >Close</button>
        </DetailsContainer>
    </ModalContainer>, document.getElementById('portal')
  )
}

const ModalContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    padding: 2em;
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
`

const DetailsContainer = styled(motion.div)`
    border-radius: 1rem;
    background-color: #fff;
    display: grid;
    padding: 1em;
    gap: 1em;

    img {
        max-width: 100%;
    }

    button {
        justify-self: center;
        max-width: 10rem;
    }
`

const Stats = styled(motion.div)`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
`

const Rating = styled(motion.div)`
    displau: flex;
    flex-direction: column;
    flex: 1 1 15rem;
`

const Info = styled(motion.div)`
    display: flex;
    flex-direction: column;
    flex: 1 1 15rem;
`

const PlatformList = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
`

const Platforms = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: .5em;
    img {
        max-width: 1rem;
    }
`

const Media = styled(motion.div)`
    img {
        max-width: 100%;
    }
`

const Description = styled(motion.div)`
    text-align: justify;
    text-justify: inter-word;
`

const Gallery = styled(motion.div)``

export default GameDetailsModal
