import Post from "./Post.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { fetchLoadingSelector, postsSelector } from '../../store/slices/postsSlice.ts';
import {useEffect} from "react";
import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { postsFetch } from '../../store/thunks/postsThunks.ts';

const PostsList = () => {
  const posts = useAppSelector(postsSelector);
  const loading = useAppSelector(fetchLoadingSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postsFetch());
  },[dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      {loading && <CircularProgress />}

      {!loading && posts.length === 0 && (
        <Typography variant="h6" color="textSecondary">
          No messages yet
        </Typography>
      )}

      {!loading && posts.length > 0 && (
        <Grid container spacing={1} justifyContent="center">
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <Grid size={8} key={post.id}>
                <Post post={post} />
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default PostsList;
