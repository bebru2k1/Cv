import React from "react";
import Particles from "react-particles-js";
import { Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import Headers from "../Headers/Headers";
function HFRoute({ ...rest }) {
  return (
    <>
      {/* <Headers /> */}
      {/* <Particles /> */}
      <Route {...rest} />
      <Footer />
    </>
  );
}

export default HFRoute;
