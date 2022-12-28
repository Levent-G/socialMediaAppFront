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
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import Context from "../context/Context";
import { Link } from "react-router-dom";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCardComp = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [post, setPost] = useState(null);
  const [postId, setPostId] = useState(null);
  const [comment, setComment] = useState(null);
  const [like, setLike] = useState(null);
  const [commentGelen, setCommentGelen] = useState(null);
  const { id, userName, avatarUrl } = useContext(Context);

  // POSTLARI ÇEKME START ------------------------------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`/posts`).then((resp) => setPost(resp.data));
  }, []);
  console.log("posts", post);

  // POSTLARI ÇEKME END ------------------------------------------------------------------------------------------------------
  // LİKELARI ÇEKME START ------------------------------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`/like`).then((resp) => setLike(resp.data));
  }, []);
  console.log("likes", like);
  // LİKELARI ÇEKME END ------------------------------------------------------------------------------------------------------
  // LİKE FUNCTİON  START ------------------------------------------------------------------------------------------------------

  const createLike = async (body) => {
    try {
      return await axios.post(`/like`, body);

      toast.success("Link Başarılı", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch {
      toast.error("Link Başarısız", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  function likeFunction(GelenPostId) {
    setPostId(GelenPostId);

    const LikeResp = createLike({
      postId: GelenPostId,
      userId: id,
    });
  }
  // LİKE FUNCTİON  END ------------------------------------------------------------------------------------------------------
  // shara FUNCTİON  START ------------------------------------------------------------------------------------------------------

  const sharePostApi = async (body) => {
    try {
      return await axios.post("/posts", body);
      toast.success("Share Başarılı", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch {
      toast.error("Share Başarısız", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  function sharePost(title, text, userId) {
    const shareResp = sharePostApi({
      title: title,
      text: text,
      userId: id,
    });

    console.log(shareResp);
  }
  // shara FUNCTİON  END ------------------------------------------------------------------------------------------------------
  // COMMENTS ÇEKME START ------------------------------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`/comments`).then((resp) => setComment(resp.data));
  }, []);
  console.log("comments", comment);
  // COMMENTS ÇEKME END ------------------------------------------------------------------------------------------------------
  // Comment FUNCTİON  START ------------------------------------------------------------------------------------------------------

  const commentPostApi = async (body) => {
    try {
      return await axios.post("/comments", body);
      toast.success("Comment Başarılı", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch {
      toast.error("Comment Başarılı", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  function commentFunction(text, id, postId) {
    const resp2 = commentPostApi({
      postId: postId,
      text: text,
      userId: id,
    });

    console.log(resp2);
  }
  // Comment FUNCTİON  END ------------------------------------------------------------------------------------------------------
  return (
    <>
      <ToastContainer />
      {post?.map((posts) => (
        <>
          <Card className="ml-96 mt-5" sx={{ maxWidth: 755 }}>
            <CardHeader
              avatar={
                <Link to={`/userpage/${posts?.userId}`} variant="body2">
                  <Avatar alt={posts?.userName} src={posts?.avatarUrl} />
                </Link>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={posts?.userName}
              subheader={posts?.createdAt}
              className="text-left"
            >
              <p className="bold text-black text-left">{userName}</p>
            </CardHeader>
            <CardMedia
              component="img"
              height="194"
              image={posts?.text}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <Typography className="bold text-black float-left ">
                  <Avatar
                    alt={posts?.userName}
                    src={posts?.avatarUrl}
                    className="float-left mr-2"
                  />{" "}
                  {posts?.userName}:
                </Typography>{" "}
                {posts?.title}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className="float-right">
              {like?.map((likes) => (
                <>
                  {likes?.userId === id && likes?.postId === posts?.id ? (
                    <>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => likeFunction(posts?.id)}
                      >
                        <FavoriteIcon className="text-red-600" />
                      </IconButton>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ))}

              <IconButton
                aria-label="add to favorites"
                onClick={() => likeFunction(posts?.id)}
              >
                <FavoriteIcon />
              </IconButton>

              <IconButton
                aria-label="share"
                onClick={() => sharePost(posts?.title, posts?.text, id)}
              >
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="comment">
                <CommentIcon
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                ></CommentIcon>
              </IconButton>
            </CardActions>
            {/* COMMENT START----------------------------------------- */}

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box className=" text-left ml-8 ">
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    With a start adornment
                  </InputLabel>
                  <Input
                    className="w-full"
                    id="input-with-icon-adornment"
                    startAdornment={<Avatar alt={userName} src={avatarUrl} />}
                    onChange={(e) => setCommentGelen(e.target.value)}
                  />
                  <Button
                    onClick={() => commentFunction(commentGelen, id, posts?.id)}
                  >
                    Send
                  </Button>
                </FormControl>
              </Box>
              {comment?.map((comments) => (
                <>
                  {comments?.postId === posts?.id ? (
                    <CardContent>
                      <List
                        sx={{
                          width: "100%",

                          bgcolor: "background.paper",
                        }}
                      >
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              alt={comments?.userName}
                              src={comments?.avatarUrl}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={comments?.userName}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                  className="w-full"
                                ></Typography>

                                {comments?.text}
                              </React.Fragment>
                            }
                          />
                          <div className="float-right">
                            <IconButton
                              aria-label="add to favorites"
                              className="float-left"
                            >
                              <FavoriteIcon className="ml-1" />
                            </IconButton>

                            <IconButton
                              aria-label="comment"
                              className="float-left"
                            >
                              <CommentIcon
                                className="ml-1"
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                              ></CommentIcon>
                            </IconButton>
                          </div>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </List>
                    </CardContent>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </Collapse>

            {/* COMMENT END ---------------------------------------------------- */}
          </Card>
        </>
      ))}
    </>
  );
};

export default PostCardComp;
