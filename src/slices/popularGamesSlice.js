import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { popularGamesURL } from "../api";

const initialState = {
    popularGames: [],
    isLoadingPopular: true,
    isError: false
}

export const getPopularGames = createAsyncThunk(
    'getPopularGames',
    async (name, thunkAPI) => {
        try {
            const resp = await axios.get(popularGamesURL())
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const gameSlice = createSlice({
    name: 'popular',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(
            getPopularGames.pending,
            (state, action) => {
                state.isLoadingPopular = true;
            }
        )
        builder.addCase(
            getPopularGames.fulfilled,
            (state, action ) => {
                state.isLoadingPopular = false;
                state.popularGames = action.payload;
            }
        )
        builder.addCase(
            getPopularGames.rejected,
            (state, action) => {
                console.log('Error', action.payload);
                state.isError = true;
            }
        )
    }
})

export default gameSlice.reducer