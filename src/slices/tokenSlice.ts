import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type InitState = {
  token: string;
}

const initialState: InitState = {
  token: '',
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    remove: (state) => {
      state.token = '';
    },
  },
})

export const { add, remove } = tokenSlice.actions

export default tokenSlice.reducer
