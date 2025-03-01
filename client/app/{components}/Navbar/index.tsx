"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Bell, Menu, Settings, Sun, Moon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7 px-4">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="search"
            placeholder="Start typing to search groups & products"
            className="pl-10 pr-4 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-3 flex items-center">
            🔍 {/* Replace with an actual search icon */}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center gap-5">
          {/* Theme Toggle */}
          <button onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Moon className="cursor-pointer text-gray-500" size={24} />
            ) : (
              <Sun className="cursor-pointer text-gray-500" size={24} />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-50 bg-red-600 rounded-full">
              99+
            </span>
          </div>

          {/* Divider */}
          <hr className="w-px h-7 border-l border-gray-300 mx-3" />

          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img
                src="/profile.jpg"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            {!isSidebarCollapsed && (
              <span className="font-semibold">NKEMS</span>
            )}
          </div>
        </div>

        {/* Settings Link */}
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
