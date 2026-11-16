import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const banner1 = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80';
const banner2 = 'https://images.unsplash.com/photos/a-group-of-dental-instruments-sitting-on-top-of-a-table-JlNYXTfN6R0';
const banner4 = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80';

import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination, Autoplay } from 'swiper/modules'

export default function Banner() {
  return (
    <div className="relative">

      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="z-0"
      >
        <SwiperSlide>
          <img
            className="h-[60vh] md:h-[80vh] w-full object-cover"
            src={banner1}
            alt="Banner 1"
          />
        </SwiperSlide>




        <SwiperSlide>
          <img
            className="h-[60vh] md:h-[80vh] w-full object-cover"
            src={banner4}
            alt="Banner 4"
          />
        </SwiperSlide>
      </Swiper>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/60 z-10"
      >

        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
          Welcome to DentalStore
        </h1>

        <p className="text-white mb-6">
          The best equipment and materials for Dental Students
        </p>

        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition">
            Login
          </button>
        </Link>

      </motion.div>

    </div>
  )
}