import React from "react";
import { CirclePopLoader } from "react-loaders-kit";

import "./Loader.scss";
function Loader() {
  const loaderProps = {
    loading: true,
    size: 320,
    duration: 1,
    color: "#FF0000",
  };

  return (
    <div className="loader">
      {/* <SwingingCubeLoader {...loaderProps} /> */}
      <CirclePopLoader {...loaderProps} />
    </div>
  );
}

export default Loader;
