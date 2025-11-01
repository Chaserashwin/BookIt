import React from "react";

const SimmerDetails = () => {
  return (
    <>
      <div className="flex w-[74px] h-5 top-[111px] left-[124px] gap-2 absolute bg-gray-300"></div>
      <div className="w-[765px] h-[381px] top-[155px] left-[124px] rounded-xl absolute bg-gray-200"></div>
      <div className="w-[765px] h-[406px] top-[568px] left-[124px] gap-8 pb-20 absolute bg-gray-100">
        <div className="flex flex-col w-[765px] h-24 gap-4 mb-4 bg-gray-200">
          <div className="w-[765px] h-8 bg-gray-300"></div>
          <div className="w-[765px] h-12 bg-gray-300"></div>
        </div>
        <div className="flex flex-col w-[765px] h-[278px] gap-6 mt-4 bg-gray-200">
          <div className="flex flex-col w-[389px] h-[68px] gap-4 bg-gray-300">
            <div className="w-[389px] h-[22px]"></div>
            <div className="flex flex-row w-[389px] h-[34px] gap-4"></div>
          </div>
          <div className="flex flex-col w-lg h-24 gap-4 bg-gray-300"></div>
          <div className="flex flex-col w-[765px] h-[66px] gap-4 bg-gray-300"></div>
        </div>
      </div>
      <div className="flex flex-col w-[387px] h-[303px] top-[155px] left-[929px] rounded-xl p-6 gap-6 absolute bg-gray-100"></div>
    </>
  );
};

export default SimmerDetails;
