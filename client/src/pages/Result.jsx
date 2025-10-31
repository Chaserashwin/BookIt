import React from "react";
import { useNavigate } from "react-router";

const Result = () => {
  const navigate = useNavigate();
  return (
    <>
      <img
        src="/greentick.png"
        className="w-20 h-20 top-[167px] left-[680px] absolute"
        alt="greentick"
      />
      <h1 className="w-[294px] h-10 top-[279px] left-[573px] font-medium text-[32px] leading-10 text-[#161616] absolute">
        Booking Confirmed
      </h1>
      <h3 className="w-[175px] h-6 top-[335px] left-[633px] font-normal text-[20px] leading-6 text-[#656565] absolute">
        Ref ID: HUF56&SO
      </h3>
      <button
        onClick={() => navigate("/")}
        className="w-[138px] h-9 top-[399px] left-[652px] rounded gap-2.5 bg-[#E3E3E3] absolute"
      >
        <span className="w-[106px] h-5 font-normal text-[16px] leading-5 text-[#656565] cursor-pointer">
          Back to Home
        </span>
      </button>
    </>
  );
};

export default Result;
