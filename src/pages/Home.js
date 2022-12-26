import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import PostCardComp from "../components/PostCardComp";
import UserListComp from "../components/UserListComp";
import NotAuthorized from "../components/NotAuthorized";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div className="m-5">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item>
                <UserListComp />
              </Grid>
              <Grid item className="text-center">
                <PostCardComp />
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
};

export default Home;
