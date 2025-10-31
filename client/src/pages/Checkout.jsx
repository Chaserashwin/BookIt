import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;
  console.log(booking);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agree, setAgree] = useState(false);
  const [finalAmount, setFinalAmount] = useState(booking?.total); // assuming totalAmount from props or state
  const [promoMessage, setPromoMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isbooking, setIsBooking] = useState(false);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handlePayAndConfirm = async () => {
    if (!fullName.trim() || !email.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!agree) return alert("Please agree to the terms first!");

    setIsBooking(true);

    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_BASE_URL;

      const bookingData = {
        id: booking?._id,
        experience: booking?.expName,
        date: booking?.date,
        time: booking.time,
        qty: booking?.qty,
        subtotal: booking?.subtotal,
        tax: booking?.tax,
        total: booking?.total,
        username: fullName,
        useremail: email,
      };
      console.log(bookingData);

      const res = await axios.post(`${apiUrl}/bookings`, bookingData);

      if (res.status === 201 || res.data.success) {
        toast.success("Booking confirmed successfully!");
        setIsBooking(false);
        navigate("/result", { state: res.data });
      } else {
        alert("Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      if (error.response) {
        // Handle specific backend messages like "slot already booked"
        alert(error.response.data.message || "❌ Failed to create booking.");
      } else {
        alert("❌ Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPromo = async () => {
    try {
      const apiUrl = import.meta.env.VITE_BASE_URL;
      console.log("Promo API URL:", `${apiUrl}/promo/validate`);

      const res = await axios.post(`${apiUrl}/promo/validate`, {
        code: promoCode,
        amount: booking?.total,
      });

      console.log("Promo Response:", res.data);

      if (res.data.success) {
        setFinalAmount(res.data.newAmount);
        setPromoMessage(res.data.message);
        toast.success("Promo applied successfully!");
      } else {
        toast.error("Invalid promo code!", {
          style: { background: "#161616", color: "#fff" },
          icon: "⚠️",
        });
        // setPromoMessage("Invalid promo code!");
      }
    } catch (err) {
      console.error("Promo error:", err);
      toast.error("Invalid promo code!", {
        style: { background: "#161616", color: "#fff" },
        icon: "⚠️",
      });
      // setPromoMessage("Invalid promo code!");
    }
  };

  return (
    <>
      {/* Checkout icon */}
      <button
        onClick={() => navigate(-1)}
        className="flex flex-row w-[93px] h-5 top-[111px] left-[150px] gap-2 absolute"
      >
        <Icon
          icon="ic:round-arrow-back"
          width="20"
          height="20"
          className="cursor-pointer"
        />
        <div className="w-[65px] h-[18px] font-medium text-[14px] leading-4.5">
          Checkout
        </div>
      </button>
      {/* first container */}
      <div className="flex flex-col w-[739px] h-[198px] top-[155px] left-[150px] rounded-xl px-6 py-5 gap-4 bg-[#EFEFEF] absolute">
        <div className="flex w-[691px] h-17 gap-6">
          <div className="flex flex-col w-[333.5px] h-17 gap-2">
            <label
              htmlFor=""
              className="w-[333.5px] h-[18px] font-normal text-[14px] leading-5.5 text-[#5B5B5B]"
            >
              Full name
            </label>
            <div className="flex h-[42px] rounded-md px-4 py-3 gap-2.5 bg-[#DDDDDD]">
              <input
                type="text"
                placeholder="Your name"
                className="w-full h-[18px] font-normal text-[14px] leading-5.5 placeholder:text-[#727272] text-[#161616] outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col h-17 gap-2">
            <label
              htmlFor=""
              className="w-[333.5px] h-[18px] font-normal text-[14px] leading-5.5 text-[#5B5B5B]"
            >
              Email
            </label>
            <div className="flex flex-row h-[42px] rounded-md px-4 py-3 gap-2.5 bg-[#DDDDDD]">
              <input
                type="text"
                placeholder="Your email"
                className="w-full h-[18px] font-normal text-[14px] leading-5.5 placeholder:text-[#727272] text-[#161616] outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex w-[691px] h-[42px] gap-4">
          <div className="flex w-[604px] h-[42px] rounded-md px-4 py-3 bg-[#DDDDDD]">
            <input
              type="text"
              placeholder="Promo code"
              className=" h-[18px] font-normal text-[14px] leading-4.5 placeholder:text-[#727272] text-[#161616] outline-none"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
          <button
            onClick={handleApplyPromo}
            className="flex w-[71px] h-[42px] rounded-lg px-4 py-3 gap-2.5 bg-[#161616] cursor-pointer"
          >
            <span className="w-[39px] h-[18px] font-medium text-[14px] leading-4.5 text-[#F9F9F9]">
              Apply
            </span>
          </button>
        </div>

        <div className="flex w-[236px] h-4 gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="w-4 h-4 cursor-pointer accent-black"
          />
          <span className="w-[212px] h-4 font-normal text-[12px] leading-4 text-[#5B5B5B]">
            I agree to the terms and safety policy
          </span>
        </div>
      </div>

      {/* Second container */}
      <div className="flex flex-col w-[387px] h-[349px] top-[155px] left-[929px] rounded-xl p-6 gap-6 bg-[#EFEFEF] absolute">
        {/* pricing */}
        <div className="flex flex-col w-[339px] h-[233px] gap-4">
          {/* first container */}
          <div className="flex flex-col w-[339px] h-[110px] gap-2.5">
            <div className="flex flex-row w-[339px] h-5 justify-between">
              <div className="w-21 h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Experience
              </div>
              <div className="h-5 font-normal text-[16px] leading-5 text-[#161616]">
                {booking?.expName}
              </div>
            </div>
            <div className="flex flex-row w-[339px] h-5 justify-between">
              <div className="w-9 h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Date
              </div>
              <div className="h-5 font-normal text-[14px] leading-5 text-[#161616]">
                {formatDate(booking?.date)}
              </div>
            </div>
            <div className="flex flex-row w-[339px] h-5 justify-between">
              <div className="w-[38px] h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Time
              </div>
              <div className="h-5 font-normal text-[14px] leading-5 text-[#161616]">
                {booking?.time}
              </div>
            </div>
            <div className="flex flex-row w-[339px] h-5 justify-between">
              <div className="w-[27px] h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Qty
              </div>
              <div className="h-5 font-normal text-[14px] leading-5 text-[#161616]">
                {booking?.qty}
              </div>
            </div>
          </div>
          {/* second container */}
          <div className="flex flex-col w-[339px] h-[50px] gap-2.5">
            <div className="flex flex-row w-[339px] h-5 justify-between">
              <div className="w-16 h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Subtotal
              </div>
              <div className="h-5 font-normal text-[16px] leading-5 text-[#161616]">
                ₹{booking.subtotal}
              </div>
            </div>
            <div className="flex flex-row w-[339px] h-5 justify-between">
              <div className="w-[45px] h-5 font-normal text-[16px] leading-5 text-[#656565]">
                Taxes
              </div>
              <div className="h-5 font-normal text-[14px] leading-5 text-[#161616]">
                ₹{booking.tax}
              </div>
            </div>
          </div>
          {/* line */}
          <div className="w-[339px] h-px bg-[#D9D9D9]"></div>
          {/* third container */}
          <div className="flex w-[339px] h-6 justify-between">
            <div className="w-12 h-6 font-medium text-[20px] leading-6 text-[#161616]">
              Total
            </div>
            <div className="h-6 font-medium text-[20px] leading-6 text-[#161616]">
              ₹{finalAmount}
            </div>
          </div>
        </div>
        {/* Pay & confirm container */}
        <button
          onClick={handlePayAndConfirm}
          disabled={!agree || loading}
          className={`flex w-[339px] h-11 rounded-lg px-5 py-3 gap-2.5  justify-center cursor-pointer ${
            !loading && !agree
              ? "bg-[#D7D7D7] text-[#7F7F7F]"
              : "bg-[#FFD643] text-[#161616] "
          }`}
        >
          <span className="w-[127px] h-5 font-medium text-[16px] leading-5 ">
            {loading ? "Processing..." : "Pay and Confirm"}
          </span>
        </button>
      </div>
    </>
  );
};

export default Checkout;
