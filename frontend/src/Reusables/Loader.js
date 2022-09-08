import React from "react";
import Lottie from "lottie-react";
import LoaderAnimation from "./loader.json";

const Loader = ({ height, width }) => {
  const style = {
    height: height ? height : "100px",
    width: width ? width : "100px",
    margin: 0,
    padding: 0,
  };
  return <Lottie animationData={LoaderAnimation} loop style={style}></Lottie>;
};

export default Loader;
