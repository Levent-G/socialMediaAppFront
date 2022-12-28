import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";

const GetOnePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  // POSTLARI ÇEKME START ------------------------------------------------------------------------------------------------------

  const getOnePostFunc = async (postId) => {
    await axios.get(`/posts/${postId}`).then((resp) => setPost(resp.data));
  };

  useEffect(() => {
    getOnePostFunc(postId);
  }, [postId]);
  const { title, userId, createdAt, text, message, userName, avatarUrl } = post;
  // POSTLARI ÇEKME END ------------------------------------------------------------------------------------------------------
  return (
    <div>
      {console.log(post)}
      <Card sx={{ maxWidth: 745 }} className="ml-auto mr-auto ">
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={post?.user?.avatarUrl}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post?.user?.userName}
          subheader={createdAt}
        />

        <CardMedia
          component="img"
          height="194"
          image={text}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default GetOnePost;
