import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosAPI from "../../utils/axiosAPI.ts";
import { IPostFromDb } from '../../types';

export const postsFetch = createAsyncThunk<IPostFromDb[]>(
  "posts/messagesFetch",
  async () => {
    const response = await AxiosAPI("/posts");
    return response.data;
  }
);
