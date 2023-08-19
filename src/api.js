// require('dotenv').config()
const url = 'https://api.rawg.io/api/games?key=';

const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

const getCurrentDay = () => {
  const day = new Date().getDay();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const popularGames = `&game?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcomingGames = `&games?dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const newGames = `&games?dates=${lastYear}, ${currentDate}&ordering=-release&page_size=10`;

// const upcomingGameURL = () => `${url}${process.env.REACT_APP_API_KEY}${upcomingGames}`;
// const popularGamesURL = () => `${url}${process.env.REACT_APP_API_KEY}${popularGames}`;
// const newGamesURL = () => `${url}${process.env.REACT_APP_API_KEY}${newGames}`;

export const upcomingGameURL = () =>
  `${url}bfd1ac5d55ce44968d917875d803177f${upcomingGames}`;
export const popularGamesURL = () =>
  `${url}bfd1ac5d55ce44968d917875d803177f${popularGames}`;
export const newGamesURL = () =>
  `${url}bfd1ac5d55ce44968d917875d803177f${newGames}`;
export const gameDetailsURL = (name) =>
  `https://api.rawg.io/api/games/${name}?key=${import.meta.env.VITE_KEY}`;
export const screenshotsURL = (name) =>
  `https://api.rawg.io/api/games/${name}/screenshots?key=${import.meta.env.VITE_KEY}`;
export const searchGamesURL = (name) =>
  `https://api.rawg.io/api/games?key=${import.meta.env.VITE_KEY}&page=2&page_size=9&search=${name}`;
// console.log(upcomingGameURL())
