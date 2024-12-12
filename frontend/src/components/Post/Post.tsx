import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import { IPostFromDb } from '../../types';

interface Props {
  post: IPostFromDb;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardActionArea sx={{ display: 'flex', alignItems: 'center' }}>
       <Box width="50%">
         <CardContent>
           <Typography variant="caption" marginRight="10px" color="text.disabled">
             Posted on:
           </Typography>
           <Typography variant="caption">{dayjs(post.date).format('DD.MM.YYYY HH:mm')}</Typography>
           <Typography gutterBottom variant="h5" component="div">
             {post.author}
           </Typography>
           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             {post.message}
           </Typography>
         </CardContent>
       </Box>
        <Box width="50%">
          {post.image && (
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:8000/${post.image}`}
              alt={`Image of ${post.author}`}
              sx={{ maxHeight: 140, objectFit: 'cover' }}
            />
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default Post;
