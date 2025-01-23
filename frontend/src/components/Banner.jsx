import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-primary h-[60vh] rounded-lg px-6 md:px-14 lg:px-12 my-20 md:mx-10">
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white"
        >
          <p className="mb-4">Book Appointment</p>
          <p>With 100+ Trusted Doctors</p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            navigate("/userlogin");
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-300 "
        >
          Create Account
        </motion.button>
      </div>

      <div className="hidden md:block md:1/2 lg:w-[370px] relative">
        <motion.img
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          src={assets.appointment_img}
          alt=""
          className="w-full absolute bottom-0 right-0 max-w-md"
        />
      </div>
    </div>
  );
};

export default Banner;
