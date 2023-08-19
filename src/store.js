import { configureStore } from "@reduxjs/toolkit";

import upcomingGamesReducer from './slices/upcomingGameSlice'
import newGamesRedcuer from './slices/newGamesSlice'
import popularGamesReducer from './slices/popularGamesSlice'
import detailsReducer from './slices/detailsSlice'
import screenshotsReducer from './slices/screenshotsSlicer'
import searchReducer from './slices/searchGamesSlice'

export const store = configureStore({
    reducer: {
        upcoming: upcomingGamesReducer,
        new: newGamesRedcuer,
        popular: popularGamesReducer,
        details: detailsReducer,
        screenshots: screenshotsReducer,
        search: searchReducer
    }
})