import { searchGamesURL } from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    search: [],
    isLoadingSearch: true,
    isError: false
}

export const getSearch = createAsyncThunk(
    'getSearch',
    async (name, thunkAPI) => {
        try {
            const resp = await axios.get(searchGamesURL(name))
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(
            getSearch.pending,
            (state, action) => {
                state.isLoadingSearch = true;
            }
        )
        builder.addCase(
            getSearch.fulfilled,
            (state, action ) => {
                state.isLoadingSearch = false;
                state.search = action.payload;
            }
        )
        builder.addCase(
            getSearch.rejected,
            (state, action) => {
                console.log('Error', action.payload);
                state.isError = true;
            }
        )
    }
})

export default searchSlice.reducer