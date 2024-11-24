// features/paintingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paintings: [],
};

const paintingSlice = createSlice({
  name: 'painting',
  initialState,
  reducers: {
    addPainting: (state, action) => {
      state.paintings.push(action.payload);
    },
  },
});

export const { addPainting } = paintingSlice.actions;

export default paintingSlice;
