import React from "react";
import Particles from "react-particles-js";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Headers from "../Headers/Headers";

function NotFound() {
  return (
    <div>
      <Particles />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "200px 0",
          color: "var(--green-color)",
        }}
      >
        <h1>404 - Not Found!</h1>
        <Link to="/">Go Home</Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
