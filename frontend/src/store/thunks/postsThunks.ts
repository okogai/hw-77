import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosAPI from "../../utils/axiosAPI.ts";
import { IPostFromDb, IPostToSend } from '../../types';

export const postsFetch = createAsyncThunk<IPostFromDb[]>(
  "posts/messagesFetch",
  async () => {
    const response = await AxiosAPI("/posts");
    return response.data;
  }
);

export const addPost = createAsyncThunk<void, IPostToSend>(
  "posts/addPost",
  async (post: IPostToSend) => {
    await AxiosAPI.post("/posts", post);
  }
);
