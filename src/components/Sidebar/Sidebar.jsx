import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border border-gray-400 border-t-0 text-[max(1vw,10px)]">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-5  ">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-2 py-2 rounded-l cursor-pointer ${
              isActive ? "bg-[#fff0ed] border-[tomato]" : "border-gray-400"
            }`
          }
        >
          <img src={assets.add_icon} alt="Add" />
          <p className="max-[900px]:hidden">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-2 py-2 rounded-l cursor-pointer ${
              isActive ? "bg-[#fff0ed] border-[tomato]" : "border-gray-400"
            }`
          }
        >
          <img src={assets.order_icon} alt="List" />
          <p className="max-[900px]:hidden">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-2 py-2 rounded-l cursor-pointer ${
              isActive ? "bg-[#fff0ed] border-[tomato]" : "border-gray-400"
            }`
          }
        >
          <img src={assets.all_order_items} alt="Orders" />
          <p className="max-[900px]:hidden">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
