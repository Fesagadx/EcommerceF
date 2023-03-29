import { createSlice } from '@reduxjs/toolkit';

export const isloadingSlice = createSlice({
		name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading : (state, action) => {
          return action.payload;
        }
    }
})

export const { setIsLoading  } = isloadingSlice.actions;

export default isloadingSlice.reducer;