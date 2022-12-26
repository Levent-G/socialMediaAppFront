import React from "react";
import { Link } from "react-router-dom";
const NotAuthorized = () => {
  return (
    <>
      <div style={{ position: "absolute", top: "30%", left: "25%" }}>
        <h1>You are not authorized for this page.</h1>
        <Link to="/" className="btn btn-warning">
          Please Login
        </Link>
      </div>
    </>
  );
};

export default NotAuthorized;
