import React from "react";

const Shimmer = () => {
  const shimmerCards = Array(8).fill(0);

  return (
    <div className="grid grid-cols-4 top-[135px] left-[124px] gap-6 pb-20 absolute">
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="flex flex-col w-[280px] h-[312px] rounded-xl bg-gray-200 animate-pulse overflow-hidden"
        >
          <div className="w-[280px] h-[170px] bg-gray-300"></div>
          <div className="w-full h-[142px] py-3 px-4 gap-5">
            <div className="w-[248px] h-[68px] gap-y-3">
              <div className="h-3 flex justify-between items-center gap-3 mb-1.5 bg-gray-300"></div>
              <div className="h-8 mt-1.5 bg-gray-300 w-1/2 rounded"></div>
            </div>
            <div className="flex w-full h-[30px] justify-between items-center">
              <div className="h-3 flex gap-1.5 items-center bg-gray-300"></div>
              <div className="w-[99px] h-[30px] rounded py-1.5 px-2 gap-2.5 bg-gray-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
