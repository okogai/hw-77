import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addPost, postsFetch } from '../thunks/postsThunks.ts';
import { RootState } from '../../app/store.ts';
import { IPostFromDb } from '../../types';

interface postsState {
  posts: IPostFromDb[];
  fetchLoading: boolean;
  sendPostLoading: boolean;
}

const initialState: postsState = {
  posts: [],
  fetchLoading: false,
  sendPostLoading: false,
};

export const postsSelector = (state: RootState) => state.posts.posts;
export const fetchLoadingSelector = (state: RootState) => state.posts.fetchLoading;
export const sendPostLoadingSelector = (state: RootState) => state.posts.sendPostLoading;

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
      .addCase(addPost.pending, (state) => {
        state.sendPostLoading = true;
      })
      .addCase(addPost.fulfilled, (state) => {
          state.sendPostLoading = false;
      })
      .addCase(addPost.rejected, (state) => {
        state.sendPostLoading = false;
      })
  },
});

export const postsReducer = postsSlice.reducer;
