import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
const Reels = () => {
  const [post, setPost] = useState(null);
  // POSTLARI ÇEKME START ------------------------------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`/posts`).then((resp) => setPost(resp.data));
  }, []);
  console.log("posts", post);

  // POSTLARI ÇEKME END ------------------------------------------------------------------------------------------------------

  return (
    <ImageList sx={{ width: 700 }} className="ml-auto mr-auto mt-5">
      {post?.map((posts) => (
        <Link to={`/getonepost/${posts?.id}`} variant="body2">
          <ImageListItem key={posts?.text}>
            <img
              src={posts?.text}
              srcSet={posts?.text}
              alt={posts?.userName}
              loading="lazy"
            />
            <ImageListItemBar
              title={posts?.message}
              subtitle={<span>by: {posts?.userName}</span>}
              position="below"
            />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
};

export default Reels;
