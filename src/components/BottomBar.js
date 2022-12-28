import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import Fab from "@mui/material/Fab";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useContext } from "react";
import Context from "../context/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];
const BottomBar = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const actions = [
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [postReturn, setPostReturn] = useState(false);
  const createdAt = Date.now();

  const { id, userName, avatarUrl, isLoggedIn } = useContext(Context);

  const token = localStorage.getItem("token");
  const addPost = async (body) => {
    try {
      return await axios
        .post("/posts", body)
        .then((resp) => setPostReturn(resp.data));
    } catch {
      toast.error("Post Başarısız", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const postFunction = async (e) => {
    e.preventDefault();

    const postResp = await addPost({
      title: title,
      text: text,
      userId: id,
      createdAt: createdAt,
    });
    if (postReturn !== null) {
      toast.success("Kayıt Başarılı Lütfen Giriş Yapınız ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Kayıt Başarısız tekrar deneyin", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      {/* <BottomNavigation
        className="fixed bottom-0  "
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<FolderIcon />}
        />
      </BottomNavigation> */}
      {token || isLoggedIn ? (
        <>
          <ToastContainer />

          <Box
            className="fixed bottom-0 right-16 "
            sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}
          >
            <Button
              onClick={handleOpen}
              sx={{ position: "absolute", bottom: 10, right: 10 }}
            >
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
              ></SpeedDial>
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={avatarUrl} className="mr-5 w-11 h-11 float-left" />
                <p className="font-bold text-xl">{userName}</p>
                <form onSubmit={postFunction}>
                  <TextField
                    value={title}
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title Giriniz"
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <TextField
                    value={text}
                    margin="normal"
                    required
                    fullWidth
                    name="text"
                    label="foto url giriniz"
                    type="text"
                    id="text"
                    onChange={(e) => setText(e.target.value)}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Send Post
                  </Button>
                </form>
              </Box>
            </Modal>
          </Box>

          <Box
            className="fixed bottom-0  right-0"
            sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}
          >
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              icon={<UpIcon />}
            />
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default BottomBar;
