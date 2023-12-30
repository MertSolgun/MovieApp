import { ThreeCircles } from "react-loader-spinner";
import React from "react";

const spinner = () => {
  return (
    <div className="mx-auto flex justify-center loading items-center">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="blue"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default spinner;
