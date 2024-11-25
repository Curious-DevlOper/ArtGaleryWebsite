// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   paintings: [],
// };

// const paintingSlice = createSlice({
//   name: 'painting',
//   initialState,
//   reducers: {
//     addPainting: (state, action) => {
//       state.paintings.push(action.payload);
//     },
//   },
// });

// export const { addPainting } = paintingSlice.actions;

// export default paintingSlice;
// src/features/paintingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artworks: [],
};

const paintingSlice = createSlice({
  name: 'painting',
  initialState,
  reducers: {
    addArtwork: (state, action) => {
      state.artworks.push(action.payload);
    },
    editArtwork: (state, action) => {
      const { index, updatedArtwork } = action.payload;
      state.artworks[index] = updatedArtwork;
    },
    deleteArtwork: (state, action) => {
      state.artworks.splice(action.payload, 1);
    },
  },
});

export const { addArtwork, editArtwork, deleteArtwork } = paintingSlice.actions;

export default paintingSlice;
