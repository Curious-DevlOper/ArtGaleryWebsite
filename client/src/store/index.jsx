import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import navigationSlice from "./navigate-slice";
import paintingSlice from './painting-slice';


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    navigation: navigationSlice.reducer,
    painting: paintingSlice.reducer,


  },
});

export default store;
//export store to connet it to react app