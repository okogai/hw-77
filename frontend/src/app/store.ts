import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from '../store/slices/postsSlice.ts';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
