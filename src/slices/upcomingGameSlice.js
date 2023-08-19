import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { upcomingGameURL} from "../api";

export const getUpcomingGames = createAsyncThunk(
    'getUpcomingGames',
    async (name, thunkAPI) => {
        try {
            const resp = await axios.get(upcomingGameURL(name))
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const initialState = {
    upcomingGames: [],
    isLoadingUpcoming: true,
    isError: false
}

const upcomingGameSlice = createSlice({
    name: 'upcoming',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(
            getUpcomingGames.pending,
            (state, action) => {
                state.isLoadingUpcoming = true;
            }
        )
        builder.addCase(
            getUpcomingGames.fulfilled,
            (state, action ) => {
                state.isLoadingUpcoming = false;
                state.upcomingGames = action.payload;
            }
        )
        builder.addCase(
            getUpcomingGames.rejected,
            (state, action) => {
                console.log('Error', action.payload);
                state.isError = true;
            }
        )
    }
})

export default upcomingGameSlice.reducer