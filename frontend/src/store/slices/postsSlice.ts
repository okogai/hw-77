import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postsFetch } from '../thunks/postsThunks.ts';
import { RootState } from '../../app/store.ts';
import { IPostFromDb } from '../../types';

interface postsState {
  posts: IPostFromDb[];
  fetchLoading: boolean;
  sendPost: boolean;
}

const initialState: postsState = {
  posts: [],
  fetchLoading: false,
  sendPost: false,
};

export const postsSelector = (state: RootState) => state.posts.posts;
export const fetchLoadingSelector = (state: RootState) => state.posts.fetchLoading;
export const sendPostLoadingSelector = (state: RootState) => state.posts.sendPost;

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postsFetch.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(postsFetch.fulfilled,(state, action: PayloadAction<IPostFromDb[]>) => {
          state.fetchLoading = false;
          state.posts = action.payload;
        },
      )
      .addCase(postsFetch.rejected, (state) => {
        state.fetchLoading = false;
      })
  },
});

export const postsReducer = postsSlice.reducer;
