import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";

const UserListComp = () => {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    axios.get(`/users`).then((resp) => setRows(resp.data));
  }, []);
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {rows?.map((users) => (
          <>
            <ListItem alignItems="flex-start">
              <Link to={`/userpage/${users?.id}`} variant="body2">
                <ListItemAvatar>
                  <Avatar alt={users?.userName} src={users?.avatarUrl} />
                </ListItemAvatar>
              </Link>
              <ListItemText
                primary={users?.userName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {users?.userName}
                    </Typography>
                    — {users?.message}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </div>
  );
};

export default UserListComp;
