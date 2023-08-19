import { gameDetailsURL} from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

const initialState = {
    gameDetails: [],
    isLoadingDetails: true,
    isError: false
}

export const getGameDetails = createAsyncThunk(
    'getGameDetails',
    async (name, thunkAPI) => {
        try {
            console.log('chk')
            const resp = await axios.get(gameDetailsURL(name))
            console.log(resp.data)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
)

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(
            getGameDetails.pending,
            (state, action) => {
                state.isLoadingDetails = true;
            }
        )
        builder.addCase(
            getGameDetails.fulfilled,
            (state, action ) => {
                state.isLoadingDetails = false;
                state.gameDetails = action.payload;
            }
        )
        builder.addCase(
            getGameDetails.rejected,
            (state, action) => {
                console.log('Error', action.payload);
                state.isError = true;
            }
        )
    }
})

export default detailsSlice.reducer