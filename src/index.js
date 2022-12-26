import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import BottomBar from "./components/BottomBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";
import Chat from "./pages/Chat";
import Reels from "./pages/Reels";
import { ContextProvider } from "./context/Context";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ContextProvider>
      <Topbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userpage/:userId" element={<UserPage />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <BottomBar />
    </ContextProvider>
  </BrowserRouter>
);
