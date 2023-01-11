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
import { useContext } from "react";
import Context from "../context/Context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import bg from "../assets/images/profile_bg.png";
import { CardActionArea } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import SettingsIcon from "@mui/icons-material/Settings";
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
const UserPage = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [users, setUsers] = useState({});
  const [post, setPost] = useState(null);
  const [commentGelen, setCommentGelen] = useState(null);
  const [comment, setComment] = useState(null);
  const { userId } = useParams();

  const getUserById = async (userId) => {
    await axios.get(`/users/${userId}`).then((resp) => setUsers(resp.data));
  };

  useEffect(() => {
    getUserById(userId);
    getPosts(userId);
  }, [userId]);
  const { idd, userName, avatarUrl, message } = users;
  const { id } = useContext(Context);
  // POSTLARI ÇEKME START ------------------------------------------------------------------------------------------------------

  const getPosts = async (userId) => {
    await axios
      .get(`/posts/getUserId/${userId}`)
      .then((resp) => setPost(resp.data));
  };
  // POSTLARI ÇEKME END ------------------------------------------------------------------------------------------------------
  // deletePOST START--------------------------------------------------------------------------------------------------------------

  const deletePostApi = (postId) => {
    axios.delete(`/posts/${postId}`);
  };
  // deletePOST END--------------------------------------------------------------------------------------------------------------

  // COMMENTS ÇEKME START ------------------------------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`/comments`).then((resp) => setComment(resp.data));
  }, []);

  // COMMENTS ÇEKME END ------------------------------------------------------------------------------------------------------
  // Comment FUNCTİON  START ------------------------------------------------------------------------------------------------------

  const commentPostApi = async (body) => {
    try {
      return await axios.post("/comments", body);
      console.log("çıkış  başarılı");
    } catch {
      console.log("çıkış başarısız.");
    }
  };
  function commentFunction(text, id, postId) {
    const resp2 = commentPostApi({
      postId: postId,
      text: text,
      userId: id,
    });
  }
  // Comment FUNCTİON  END ------------------------------------------------------------------------------------------------------
  return (
    <div>
      <Card className="w-full h-96">
        <CardActionArea>
          <CardMedia
            component="img"
            image={bg}
            alt="green iguana"
            className=" h-56"
          />
          <CardContent className="relative -top-28">
            <img className="w-36 h-36 " alt={userName} src={avatarUrl} />

            <Typography gutterBottom variant="h5" component="div">
              {userName}{" "}
              {userId == id ? (
                <Link to={`/settings`} variant="body2">
                  <IconButton aria-label="settings">
                    <SettingsIcon />
                  </IconButton>
                </Link>
              ) : (
                ""
              )}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {message}
            </Typography>
            <IconButton aria-label="add to favorites">
              25
              <FavoriteIcon className="ml-1" />
            </IconButton>
            <IconButton aria-label="share">
              20 <ShareIcon className="ml-1" />
            </IconButton>
            <IconButton aria-label="comment">
              100
              <CommentIcon
                className="ml-1"
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
              ></CommentIcon>
            </IconButton>
          </CardContent>
        </CardActionArea>
      </Card>{" "}
      {post?.map((posts) => (
        <>
          <Card className="ml-auto mr-auto mt-3" sx={{ maxWidth: 755 }}>
            {userId == id ? (
              <>
                <CardHeader
                  avatar={
                    <Link to={`/userpage/${posts?.userId}`} variant="body2">
                      <Avatar alt={posts?.userName} src={posts?.avatarUrl} />
                    </Link>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <Button
                        onClick={() => {
                          deletePostApi(posts?.id);
                        }}
                      >
                        {" "}
                        <DeleteIcon className="text-red-500" />
                      </Button>
                    </IconButton>
                  }
                  title={posts?.id}
                  subheader="September 14, 2016"
                ></CardHeader>
              </>
            ) : (
              <>
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
                  title={posts?.id}
                  subheader="September 14, 2016"
                ></CardHeader>
              </>
            )}

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
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>

              <IconButton aria-label="share">
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
            <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                      onClick={() =>
                        commentFunction(commentGelen, id, posts?.id)
                      }
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
              <Divider variant="inset" component="li" />
            </Collapse>
          </Card>
        </>
      ))}
    </div>
  );
};

export default UserPage;
