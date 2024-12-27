import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { heroSecImg } from "../assets/assets";

const Header = () => {
  const images = [
    heroSecImg.hero_img1,
    heroSecImg.hero_img2,
    heroSecImg.hero_img3,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='relative flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20 py-20'>
      <div className='absolute inset-0 z-[-1]'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] z-[1]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight drop-shadow-lg'>
          Book Appointment <br/> With Trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row gap-3 text-white text-sm font-tight items-center drop-shadow-md'>
          <img className='w-28' src={assets.group_profiles}/>
          <p>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block'/>
          schedule your appointment hassle-free.</p>
        </div>
        <a href='#speciality' className='flex flex-row gap-2 items-center bg-white px-8 py-3 text-sm text-gray-600 rounded-full m-auto md:m-0 hover:scale-105 transition-all duration-300'>
          Book appointment <img className='w-3' src={assets.arrow_icon}/>
        </a>
      </div>
    </div>
  );
};

export default Header;
