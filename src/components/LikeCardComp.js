import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import Context from "../context/Context";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
const LikeCardComp = () => {
  const [like, setLike] = useState(null);
  const { id, userName, avatarUrl } = useContext(Context);
  // LİKELARI ÇEKME START ------------------------------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`/like`).then((resp) => setLike(resp.data));
  }, []);
  console.log("likes", like);
  // LİKELARI ÇEKME END ------------------------------------------------------------------------------------------------------

  // Comment FUNCTİON  END ------------------------------------------------------------------------------------------------------
  return (
    <>
      {like?.map((likes) => (
        <>
          {likes?.userId === id ? (
            <>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon className="text-red-600" />
              </IconButton>
            </>
          ) : (
            ""
          )}
        </>
      ))}
    </>
  );
};

export default LikeCardComp;
