import React, { ChangeEvent, useState } from 'react';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { IPostToSend } from '../../types';
import { sendPostLoadingSelector } from '../../store/slices/postsSlice.ts';
import { postsFetch } from '../../store/thunks/postsThunks.ts';
import Grid from '@mui/material/Grid2';
import FileInput from '../UI/FileInput/FileInput.tsx';

const initialState = {
  author: '',
  message: '',
  image: null
}

const PostForm = () => {
  const [form, setForm] = useState<IPostToSend>(initialState);
  const loading = useAppSelector(sendPostLoadingSelector);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({ ...form, [name]: value });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setForm(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form)
    if (form.message.trim() === '') {
      alert("Please fill in all fields ");
    } else {
      await dispatch(postsFetch());
      setForm(initialState);
    }
  };

  return (
    <Grid container spacing={1} rowSpacing={2} sx={{maxWidth: "500px", marginX: "auto", marginY: "20px"}} direction="column" justifyContent="center" component="form" onSubmit={handleSubmit}>
      <Grid alignSelf="center">
        <Typography variant="h4">Publish a post</Typography>
      </Grid>
      <Grid>
        <TextField
          label="Enter your name"
          name="author"
          variant="outlined"
          fullWidth
          size="small"
          value={form.author}
          onChange={handleChange}
        />
      </Grid>
      <Grid>
        <TextField
          label="Enter your message"
          name="message"
          variant="outlined"
          fullWidth
          size="small"
          value={form.message}
          onChange={handleChange}
        />
      </Grid>
      <Grid>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid alignSelf="center">
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading
            ? <CircularProgress size="24px"/>
            : 'Send'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PostForm;
