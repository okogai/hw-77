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
    const formData = new FormData();
    formData.append('message', post.message);
    if (post.author) {
      formData.append('author', post.author);
    }
    if (post.image) {
      formData.append('image', post.image);
    }
    await AxiosAPI.post("/posts", formData);
  }
);
