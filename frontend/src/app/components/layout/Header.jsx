"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  UserIcon,
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import LoginForm from "@/app/(pages)/auth/login/page";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUserAsync, logoutUserAsync } from "@/app/(pages)/auth/authSlice";

const Header = () => {
  const user = {
    name: "Milan Bhattarai",
    profilePicture: null, // Assuming null if no profile picture is set
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const dropdownRef = useRef(null); // Ref for detecting clicks outside

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const isLogin = useSelector((store) => store.user.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticateUserAsync());
  }, [dispatch]);

  console.log(isLogin);

  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "U"; // Default to 'U' if no name

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-glassyWhite backdrop-blur-md shadow-md sticky top-0 z-50 w-full px-10">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          <div className="text-xl font-bold text-blue-600">Shopylib</div>

          <div className="hidden md:flex flex-grow mx-4">
            <input
              type="text"
              className="w-full outline-none px-4 py-2 border border-gray-300 rounded-l-md"
              placeholder="Search products..."
            />
            <button className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
              Search
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-sm font-semibold text-gray-600">
              Become a Seller
            </button>

            {!isLogin ? (
              <button
                onClick={openPopup}
                className="text-sm font-semibold text-gray-600 flex items-center"
              >
                <UserIcon className="h-5 w-5 mr-1" /> Login
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 cursor-pointer bg-green-500 rounded-full text-white font-bold text-xl"
                >
                  {/* If the user has no profile picture, show the first letter */}
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={`${user.name}'s profile`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    firstLetter
                  )}
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        My Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Orders
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Wishlist
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Reviews
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        My Returns
                      </li>
                      <li
                        onClick={() => dispatch(logoutUserAsync())}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <button>
              <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <MenuIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-2 bg-white shadow-md">
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search products..."
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Search
              </button>
              <button className="text-sm font-semibold text-gray-600">
                Become a Seller
              </button>
              {!isLogin && (
                <button
                  onClick={openPopup}
                  className="text-sm font-semibold text-gray-100 bg-red-500 flex items-center"
                >
                  <UserIcon className="h-5 w-5 mr-1" /> Login
                </button>
              )}
              <button className="flex items-center justify-start text-gray-600">
                <ShoppingCartIcon className="h-6 w-6 mr-1" />
                Cart
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Login Popup */}
      {!isLogin && <LoginForm showPopup={showPopup} closePopup={closePopup} />}
    </>
  );
};

export default Header;
