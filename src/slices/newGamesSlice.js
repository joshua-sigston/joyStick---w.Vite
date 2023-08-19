import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { newGamesURL } from '../api';

export const getNewGames = createAsyncThunk(
    'getUpcomingGames',
    async (name, thunkAPI) => {
        try {
            const resp = await axios.get(newGamesURL(name))
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const initialState = {
    newGames: [],
    isLoadingNew: true,
    isError: false
}

const newGameSlice = createSlice({
    name: 'new',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(
            getNewGames.pending,
            (state, action) => {
                state.isLoadingNew = true;
            }
        )
        builder.addCase(
            getNewGames.fulfilled,
            (state, action ) => {
                state.isLoadingNew = false;
                state.newGames = action.payload;
            }
        )
        builder.addCase(
            getNewGames.rejected,
            (state, action) => {
                console.log('Error', action.payload);
                state.isError = true;
            }
        )
    } 
})

export default newGameSlice.reducer