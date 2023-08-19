import { screenshotsURL } from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    screenshots: [],
    isLoadingShots: true,
    isError: false
}

export const getScreenshots = createAsyncThunk(
    'getScreenshots',
    async (name, thunkAPI) => {
        try {
            const resp = await axios.get(screenshotsURL(name))
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const detailsSlice = createSlice({
    name: 'screenshots',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(
            getScreenshots.pending,
            (state, action) => {
                state.isLoadingShots = true;
            }
        )
        builder.addCase(
            getScreenshots.fulfilled,
            (state, action ) => {
                state.isLoadingShots = false;
                state.screenshots = action.payload;
            }
        )
        builder.addCase(
            getScreenshots.rejected,
            (state, action) => {
                console.log('Error', action.payload);
                state.isError = true;
            }
        )
    }
})

export default detailsSlice.reducer