import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mt-14">
      <div className="flex flex-col justify-center sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-14 text-sm">
        <div>
          <img className="mb-5 w-40" src={assets.logo} />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div>
          <p className="text-xl mb-5 font-medium">COMPANY</p>
          <ul className="text-gray-600 flex flex-col gap-2">
            <li>Home</li>
            <li>About us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl mb-5 font-medium">GET IN TOUCH</p>
          <ul className="text-gray-600 flex flex-col gap-2">
            <li>+0-000-000-000</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
