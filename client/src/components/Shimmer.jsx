import React from "react";

const Shimmer = () => {
  const shimmerCards = Array(8).fill(0);

  return (
    <div className="grid grid-cols-4 gap-6 p-8">
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="w-full rounded-xl bg-gray-200 animate-pulse overflow-hidden"
        >
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 w-3/4 rounded"></div>
            <div className="h-3 bg-gray-300 w-1/2 rounded"></div>
            <div className="h-3 bg-gray-300 w-1/4 rounded"></div>
            <div className="h-8 bg-gray-300 w-24 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
