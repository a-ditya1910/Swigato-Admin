import React from "react";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-[4%] py-2">
      <div>
        <a href="/" className="flex flex-col sm:flex-row sm:items-center gap-1">
          <h2 className="text-[26px] font-bold tracking-tight text-[#a40404]">
            Swigato
          </h2>
          <span className="font-semibold text-sm sm:ml-2">Admin Panel</span>
        </a>
      </div>
      <img className="w-10 h-10 object-cover rounded-full" src={assets.profile_image} alt="profile" />
    </div>
  );
};

export default Navbar;
