import React from "react";
import Button from "@mui/material/Button";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TextField from "@mui/material/TextField";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const ChatComp = () => {
  return (
    <div className="   border-solid border-2 border-sky-700 ">
      <div className=" border-solid bg-sky-700 w-full p-5 text-white ">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          className="float-left"
        >
          <IconButton sx={{ p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src="https://www.melivecode.com/users/10.png"
              className="mr-2 ml-5 "
            />
          </IconButton>
        </StyledBadge>

        <p>Zoe</p>
        <span className="time-right">11:00</span>
        <div className="float-right ">
          <LocalPhoneIcon className="text-white mr-5" fontSize="large" />
          <VideoCameraFrontIcon className="text-white " fontSize="large" />
        </div>
      </div>
      <div className="p-12">
        <div className=" mt-10 mr-8 border-solid bg-blue-600 w-full p-5 text-white rounded-full">
          <img
            src="https://www.melivecode.com/users/10.png"
            alt="Avatar"
            className="w-12 h-12 float-left mr-5"
          />
          <p>
            Hello. How are you today?Sweet! So, what do you wanna do
            today?Sweet! So, what do you wanna do today?Sweet! So, what do you
            wanna do today?Sweet! So, what do you wanna do today?
          </p>
          <span className="time-right">11:00</span>
        </div>

        <div className="mt-10 ml-8 border-solid bg-blue-400 w-full p-5 text-right text-white rounded-full">
          <img
            src="https://www.melivecode.com/users/1.png"
            alt="Avatar"
            className="w-12 h-12 float-right ml-5"
          />
          <p>
            Hey! I'm fine. Thanks for asking!Sweet! So, what do you wanna do
            today?Sweet! So, what do you wanna do today? Sweet! So, what do you
            wanna do today?
          </p>
          <br />
          <span className="time-left ">11:01</span>
        </div>

        <div className="mt-10  mr-8 border-solid bg-blue-600 w-full p-5 text-white rounded-full">
          <img
            src="https://www.melivecode.com/users/10.png"
            alt="Avatar"
            className="w-12 h-12 float-left mr-5"
          />
          <p>
            Sweet! So, what do you wanna do today?Sweet! So, what do you wanna
            do today?Sweet! So, what do you wanna do today?Sweet! So, what do
            you wanna do today?Sweet! So, what do you wanna do today?
          </p>
          <span className="time-right">11:02</span>
        </div>

        <div className="mt-10 ml-8  border-solid bg-blue-400 w-full p-5 text-right text-white rounded-full">
          <img
            src="https://www.melivecode.com/users/1.png"
            alt="Avatar"
            className="w-12 h-12 float-right ml-5"
          />
          <p>
            Hey! I'm fine. Thanks for asking!
            className="float-right"className="float-right"className="float-right"className="float-right"className="float-right"className="float-right"className="float-right"
          </p>
          <br />
          <span className="time-left ">11:01</span>
        </div>
      </div>
      <form>
        <Box sx={{ width: "100%" }} className=" bg-sky-600 ">
          <Grid container rowSpacing={1} className="pl-48 p-5">
            <Grid xs={8}>
              <TextField
                margin="normal"
                required
                name="message"
                type="message"
                success
                id="outlined-textarea"
                label="Send Message"
                placeholder="Placeholder"
                multiline
                fullWidth
                className="float-left bg-blue-200 text-white"
              />
            </Grid>
            <Grid className="mt-5 ml-5">
              <Button type="submit" variant="contained" color="success">
                <SendIcon />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default ChatComp;
