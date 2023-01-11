import React from "react";
import { createContext, useState, useEffect } from "react";

import axios from "axios";
// import axios from "axios";

const Context = createContext();

export function ContextProvider({ children }) {
  const [users, setUsers] = useState({});
  const [accessToken, setAccessToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const giren = localStorage.getItem("giren");
  const getUserById = async (giren) => {
    await axios.get(`/users/${giren}`).then((resp) => setUsers(resp.data));
  };

  useEffect(() => {
    getUserById(giren);
  }, [giren]);

  const { id, userName, avatarUrl, email, message } = users;

  return (
    <Context.Provider
      value={{
        userName,
        id,
        avatarUrl,
        accessToken,
        setAccessToken,
        isLoggedIn,
        setIsLoggedIn,
        email,
        message,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
