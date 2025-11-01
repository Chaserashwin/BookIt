import { Icon } from "@iconify/react";
import { Link, useNavigate, useParams } from "react-router";
// import Experiences from "../utils/Experiences";
import { useState } from "react";
import { useEffect } from "react";
import Shimmer from "../components/Shimmer";
import axios from "axios";

const Details = () => {
  const [experience, setExperience] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [quantity, setQuantity] = useState(1);
  const isReadyToConfirm = selectedDate && selectedTime;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperienceById = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BASE_URL;
        // console.log("Fetching from:", apiUrl);

        const res = await axios.get(`${apiUrl}/experiences/${id}`);
        console.log("Response:", res);
        setExperience(res.data);
      } catch (error) {
        console.error("error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperienceById();
  }, [id]);

  // const experience = Experiences.find(
  //   (exp) => exp.id.toString() === id.toString()
  // );

  const TAX = 59;
  const PRICE = experience?.price;
  const subtotal = PRICE * quantity;
  const total = subtotal + TAX;

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      navigate("/checkout", {
        state: {
          expName: experience?.name,
          date: selectedDate,
          time: selectedTime,
          qty: quantity,
          subtotal,
          total,
          tax: TAX,
        },
      });
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) return <Shimmer />;

  return (
    <>
      {/* details icon */}
      <button
        onClick={() => navigate(-1)}
        className="flex w-[74px] h-5 top-[111px] left-[124px] gap-2 absolute"
      >
        <Icon
          icon="ic:round-arrow-back"
          width="20"
          height="20"
          className="cursor-pointer"
        />
        <div className="w-[46px] h-[18px] font-medium text-[14px] leading-4.5">
          Details
        </div>
      </button>
      {/* image card */}
      <img
        src={experience?.photoUrl}
        className="w-[765px] h-[381px] top-[155px] left-[124px] rounded-xl absolute"
        alt={experience?.name}
      />
      {/* bottom card */}
      <div className="w-[765px]  top-[568px] left-[124px] gap-8 pb-20 absolute">
        <div className="flex flex-col w-[765px] h-24 gap-4 mb-4">
          <h2 className="w-[765px] h-8 font-medium text-[24px] leading-8 text-[#161616]">
            Kayaking
          </h2>
          <p className="w-[765px] h-12 font-normal text-[16px] leading-6 text-[#6C6C6C]">
            Curated small-group experience. Certified guide. Safety first with
            gear included. Helmet and Life jackets along with an expert will
            accompany in kayaking.
          </p>
        </div>
        <div className="flex flex-col w-[765px] h-[278px] gap-6 mt-4">
          {/* Choose date */}
          <div className="flex flex-col w-[389px] h-[68px] gap-4">
            <div className="w-[389px] h-[22px] font-medium text-[18px] leading[22px] text-[#161616]">
              Choose date
            </div>
            <div className="flex flex-row w-[389px] h-[34px] gap-4">
              {experience?.dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`w-[69px] h-[34px] rounded px-3 py-2 gap-2.5 cursor-pointer ${
                    selectedDate === date
                      ? "bg-[#FFD643]"
                      : "border-[0.6px] border-[#BDBDBD]"
                  }`}
                >
                  <div
                    className={`w-[45px] h-[18px] font-normal text-[14px] leading-4.5 ${
                      selectedDate === date
                        ? "text-[#161616]"
                        : "text-[#838383]"
                    }`}
                  >
                    {formatDate(date)}
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Choose time */}
          <div className="flex flex-col w-lg h-24 gap-4">
            <div className="w-lg h-[22px] font-medium text-[18px] leading-5.5 text-[#161616]">
              Choose time
            </div>
            <div className="flex flex-col w-lg h-[62px] gap-3">
              <div className="flex flex-row w-lg h-[34px] gap-4">
                {experience?.timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  const isSoldOut = slot.soldOut;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => !isSoldOut && setSelectedTime(slot.time)}
                      disabled={isSoldOut}
                      className={`flex flex-row w-auto h-[34px] rounded px-3 py-2 gap-1.5  items-center ${
                        isSoldOut
                          ? "text-[#838383] bg-[#CCCCCC] cursor-not-allowed"
                          : isSelected
                          ? "text-[#161616] bg-[#FFD643] cursor-pointer"
                          : "text-[#838383] border-[0.6px] border-[#BDBDBD] cursor-pointer"
                      }`}
                    >
                      <span className="w-[62px] h-[18px] font-normal text-[14px] leading-4.5 ">
                        {slot.time}
                      </span>
                      {!isSoldOut ? (
                        <span className="w-[25px] h-3 font-medium text-[10px] leading-3 text-[#FF4C0A]">
                          {slot.left} left
                        </span>
                      ) : (
                        <span className="w-10 h-3 font-medium text-[10px] leading-3 text-[#6A6A6A]">
                          Sold out
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="w-lg h-4 font-normal text-[12px] leading-4 text-[#838383]">
                All times are in IST (GMT +5:30)
              </div>
            </div>
          </div>
          {/* About */}
          <div className="flex flex-col w-[765px] h-[66px] gap-4">
            <div className="w-[765px] h-[22px] font-medium text-[18px] leading-5.5 text-[#161616]">
              About
            </div>
            <div className="flex w-[765px] h-8 rounded px-3 py-2 gap-2.5 bg-[#EEEEEE]">
              <div className="w-[380px] h-4 font-normal text-[12px] leading-4 text-[#838383]">
                {experience?.about}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* right card */}
      <div className="flex flex-col w-[387px] h-[303px] top-[155px] left-[929px] rounded-xl p-6 gap-6 bg-[#EFEFEF] absolute">
        <div className="flex flex-col w-[339px] h-[187px] gap-4">
          <div className="grid w-[339px] h-[130px] grid-cols-1 grid-rows-2 gap-x-[174px] gap-y-5 ">
            <div className="flex flex-row w-[339px] h-[22px] justify-between">
              <div className="w-[65px] h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Starts at
              </div>
              <div className="w-11 h-[22px] font-normal text-[18px] leading-[22px] text-[#161616]">
                ₹{experience?.price}
              </div>
            </div>
            <div className="flex flex-row w-[339px] h-5 top-[37.5px] justify-between">
              <div className="w-[65px] h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Quantity
              </div>
              <div className="w-14 h-4 gap-[9px] flex flex-row">
                <button onClick={decrementQty}>
                  <Icon
                    icon="ic:outline-minus"
                    className="w-4 h-4 border-[0.4px] border-[#C9C9C9] cursor-pointer"
                  />
                </button>
                <div className="w-1.5 h-3.5 font-normal text-[12px] leading-3.5 text-[#161616]">
                  {quantity}
                </div>
                <button onClick={incrementQty}>
                  <Icon
                    icon="material-symbols:add"
                    className="w-4 h-4 border-[0.4px] border-[#C9C9C9] cursor-pointer"
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-row w-[339px] h-5 top-[75px] justify-between">
              <div className="w-16 h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Subtotal
              </div>
              <div className="w-[34px] h-5 font-normal text-[14px] leading-5 text-[#161616]">
                ₹{subtotal}
              </div>
            </div>
            <div className="flex flex-row w-[339px] h-5 top-[112.5px] justify-between">
              <div className="w-[45px] h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Taxes
              </div>
              <div className="w-[25px] h-5 font-normal text-[14px] leading-5 text-[#161616]">
                ₹{TAX}
              </div>
            </div>
          </div>
          <div className="w-[339px] h-px bg-[#D9D9D9]"></div>
          <div className="flex flex-row w-[339px] h-6 justify-between">
            <div className="w-12 h-6 font-medium text-[20px] leading-6 text-[#161616]">
              Total
            </div>
            <div className="w-[49px] h-6 font-medium text-[20px] leading-6 text-[#161616]">
              ₹{total}
            </div>
          </div>
        </div>
        <button
          disabled={!isReadyToConfirm}
          className={`flex w-[339px] h-11 rounded-lg py-3 px-5 gap-2.5 justify-center ${
            isReadyToConfirm
              ? "bg-[#FFD643] text-[#161616] cursor-pointer"
              : "bg-[#D7D7D7] text-[#7F7F7F] cursor-not-allowed"
          }`}
          onClick={handleConfirm}
        >
          <span className="w-[62px] h-5 font-medium text-[16px] leading-5">
            Confirm
          </span>
        </button>
      </div>
    </>
  );
};

export default Details;
