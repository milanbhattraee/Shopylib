// src/app/components/Categories.jsx
import React from 'react';

// Sample category data (add more categories as needed)
const categories = [
  {
    id: 1,
    title: 'Electronics',
    imgSrc: '/images/banner1.jpg', // Replace with your image path
  },
  {
    id: 2,
    title: 'Fashion',
    imgSrc: '/images/banner2.jpg', // Replace with your image path
  },
  {
    id: 3,
    title: 'Home & Kitchen',
    imgSrc: '/images/banner3.jpg', // Replace with your image path
  },
  {
    id: 4,
    title: 'Books',
    imgSrc: '/images/banner1.jpg', // Replace with your image path
  },
  {
    id: 5,
    title: 'Sports',
    imgSrc: '/images/banner2.jpg', // Replace with your image path
  },
  {
    id: 6,
    title: 'Beauty',
    imgSrc: '/images/banner3.jpg', // Replace with your image path
  },
  {
    id: 7,
    title: 'Toys',
    imgSrc: '/images/logo.jpg', // Replace with your image path
  },
  {
    id: 8,
    title: 'Automotive',
    imgSrc: '/images/banner1.jpg', // Replace with your image path
  },
];

const Categories = () => {
  return (
    <div className=" p-4 rounded-lg px-10  ">
      <h2 className="text-2xl font-bold mb-4 text-start">Categories</h2> {/* Center the title */}
      <div className="flex bg-white backdrop-blur-md  rounded-md py-4 overflow-x-auto space-x-4 px-6 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent "> {/* Add horizontal padding */}
        {categories.map((category) => (
          <div key={category.id} className="w-full py-4  m-auto rounded-lg min-w-[125px] transition-all ease-linear duration-200 hover:scale-105 cursor-pointer overflow-hidden ">
            <img
              src={category.imgSrc}
              alt={category.title}
              className="h-28 w-28 mx-auto cursor-pointer  shadow-md rounded-full object-cover" // 50% rounded for circular shape
            />
            <h3 className="text-center mt-2  font-semibold">{category.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
