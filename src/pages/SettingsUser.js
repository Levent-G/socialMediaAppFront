import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useContext } from "react";
import Context from "../context/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const SettingsUser = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   STATE OF SETTING START---------------------------------------------
  const [settingUserName, setSettingUserName] = useState(null);
  const [settingEmail, setSettingEmail] = useState(null);
  const [settingAvatarUrl, setSettingAvatarUrl] = useState(null);

  const [settingMessage, setSettingMessage] = useState(null);

  const giren = localStorage.getItem("giren");
  const token = localStorage.getItem("token");
  // STATE OF SETTING END---------------------------------------------

  // SETTING FUNCTION START -----------------------------------------------
  const updateOneUserApi = async (body) => {
    try {
      return await axios.put(`/users/${giren}`, body);

      toast.success("Update Başarılı Lütfen Giriş Yapınız ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch {
      toast.error("Update Başarısız tekrar deneyin", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const settingFunction = async (e) => {
    e.preventDefault();

    const resp = await updateOneUserApi({
      userName: settingUserName,

      avatarUrl: settingAvatarUrl,
      email: settingEmail,
      message: settingMessage,
      accessToken: token,
    });
  };
  // SETTING FUNCTION END -----------------------------------------------
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Profil Düzenle" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <form onSubmit={settingFunction}>
          <TextField
            value={settingUserName}
            margin="normal"
            required
            fullWidth
            name="userName"
            label="User Name"
            type="text"
            id="userName"
            onChange={(e) => setSettingUserName(e.target.value)}
          />
          <TextField
            value={settingEmail}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setSettingEmail(e.target.value)}
          />

          <TextField
            value={settingAvatarUrl}
            margin="normal"
            required
            fullWidth
            id="avatarUrl"
            label="Avatar Url"
            name="avatarUrl"
            autoComplete="text"
            autoFocus
            onChange={(e) => setSettingAvatarUrl(e.target.value)}
          />

          <TextField
            value={settingMessage}
            margin="normal"
            required
            fullWidth
            id="message"
            label="message"
            name="message"
            autoComplete="text"
            autoFocus
            onChange={(e) => setSettingMessage(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            size="small"
            endIcon={<SendIcon />}
            sx={{ mt: 3, mb: 2, width: "250px", float: "right" }}
          >
            Send
          </Button>
        </form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
};

export default SettingsUser;
