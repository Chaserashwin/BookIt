import React from "react";
import { Link } from "react-router";

const Card = (data, key) => {
  const {
    id,
    name,
    location,
    description,
    about,
    photoUrl,
    dates,
    times,
    price,
  } = data.data;

  return (
    <div
      key={key}
      className="flex flex-col w-[280px] h-[312px] rounded-xl overflow-hidden"
    >
      <img src={photoUrl} alt="photo" className="w-[280px] h-[170px]" />
      <div className="w-full h-[142px] py-3 px-4 gap-5 bg-[#F0F0F0]">
        <div className="w-[248px] h-[68px] gap-y-3">
          <div className="flex justify-between items-center gap-3 mb-1.5">
            <div className="h-5">
              <div className="text-[16px] leading-5 font-medium">{name}</div>
            </div>
            <div className="h-6 py-1 px-2 gap-2.5 bg-[#D6D6D6] rounded">
              <div className="text-[11px] leading-4 font-medium text-[#161616]">
                {location}
              </div>
            </div>
          </div>
          <div className="text-[12px] leading-4 font-normal text-[#6C6C6C] h-8 mt-1.5">
            {description.slice(0, 60)}
          </div>
        </div>
        <div className="flex w-full h-[30px] justify-between items-center">
          <div className="flex gap-1.5 items-center">
            <div className="w-[29px] h-4 font-normal text-[12px] leading-4">
              From
            </div>
            <div className="w-[50px] h-6 font-medium text-[20px] leading-6">
              {price}
            </div>
          </div>
          <Link to={`/details/${id}`}>
            <div className="w-[99px] h-[30px] rounded py-1.5 px-2 bg-[#FFD643] gap-2.5 cursor-pointer">
              <div className="w-[83px] h-[18px] font-medium text-[14px] leading-[18px]">
                View Details
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
