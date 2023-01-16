import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UserListComp from "../components/UserListComp";
import ChatComp from "../components/ChatComp";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));
const Chat = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item>
            <Item>
              <UserListComp />
            </Item>
          </Grid>
          <Grid className="ml-auto mr-auto mt-5  " xs={6}>
            <ChatComp />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Chat;
