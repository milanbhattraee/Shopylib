// src/app/components/featuredCarousel/Carousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

// Replace with your actual image URLs
const banners = [
  { id: 1, imgSrc: '/images/banner1.jpg', alt: 'Banner 1' },
  { id: 2, imgSrc: '/images/banner2.jpg', alt: 'Banner 2' },
  { id: 3, imgSrc: '/images/banner3.jpg', alt: 'Banner 3' },

];

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // Register required modules
      navigation // Enable navigation
      pagination={{ clickable: true }} // Enable pagination
      autoplay={{ delay: 3000 }} // Autoplay settings
      loop={true} // Enable loop mode
      className="mySwiper" // Custom class for styling
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <img
            src={banner.imgSrc}
            alt={banner.alt}
            className="w-full h-60 object-cover" // Responsive styling for images
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
