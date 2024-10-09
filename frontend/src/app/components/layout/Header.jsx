"use client"
import React, { useState } from 'react';
import { UserIcon, ShoppingCartIcon, MenuIcon, XIcon } from '@heroicons/react/outline'; // Corrected imports

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-glassyWhite backdrop-blur-md shadow-md sticky top-0 z-50 w-full  px-10">
      <div className="container mx-auto px-4 flex items-center justify-between  py-4">
        <div className="text-xl font-bold text-blue-600">Shopylib</div>

        <div className="hidden md:flex flex-grow mx-4">
          <input
            type="text"
            className="w-full outline-none px-4 py-2 border border-gray-300 rounded-l-md "
            placeholder="Search products..."
          />
          <button className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
            Search
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="text-sm font-semibold text-gray-600">Become a Seller</button>
          <button className="text-sm font-semibold text-gray-600 flex items-center">
            <UserIcon className="h-5 w-5 mr-1" /> Login
          </button>
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
            <button className="text-sm font-semibold text-gray-600">Become a Seller</button>
            <button className="text-sm font-semibold text-gray-600 flex items-center">
              <UserIcon className="h-5 w-5 mr-1" /> Login
            </button>
            <button className="flex items-center justify-start text-gray-600">
              <ShoppingCartIcon className="h-6 w-6 mr-1" />
              Cart
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
