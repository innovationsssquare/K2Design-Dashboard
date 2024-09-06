"use client"
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../public/Lottie/Documetlottie.json";

const Manageorders = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-screen">
      <Lottie options={defaultOptions}  height={100}
              width={100}></Lottie>
              <p className="text-[#1a181e] font-semibold ">Orders will appear here</p>
    </div>
  );
};

export default Manageorders;
