import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import ConfettiComponent from "react-confetti";

const Confetti = () => {
  const { width, height } = useWindowSize();
  return <ConfettiComponent width={width} height={height} />;
};
export default Confetti;
