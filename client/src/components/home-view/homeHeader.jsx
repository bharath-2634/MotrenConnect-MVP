import React from 'react';
import BottomNav from '../common/header';
import "../styles/style.css";
import Account from '../common/account';
import { MdRocketLaunch } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import Spline from "@splinetool/react-spline";
import { useNavigate } from 'react-router-dom';

const reviews = [
  { name: "Aarav", text: "Motren gave me purpose again. Grateful!" },
  { name: "Sneha", text: "Landed my first freelance project here!" },
  { name: "Karthik", text: "Love the community and the mission." },
  { name: "Riya", text: "Empowering platform for all ages!" },
  { name: "Vishnu", text: "A truly meaningful initiative." },
];

const HomeHeader = () => {

  const navigate = useNavigate();

  return (
    <section className='custom-bg w-full flex flex-col items-center justify-center min-h-screen relative overflow-hidden'>

      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/5UGjMdIWIh6IxHTY/scene.splinecode" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="w-full h-full flex items-center">
          <div className="flex animate-marquee space-x-6 opacity-30 blur-sm px-6">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="min-w-[300px] max-w-[300px] h-[160px] bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md text-white flex flex-col justify-between"
              >
                <p className="text-sm italic">"{review.text}"</p>
                <p className="text-xs text-right mt-2">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Side Fades */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#0b0018] to-transparent z-20"></div>
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#0b0018] to-transparent z-20"></div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center min-h-screen px-4 text-white text-center">
        <BottomNav />
        <Account />
        <div className='mt-[12rem] flex flex-col items-center'>
          <h4 className='text-sm sm:text-base'>Want to be a part of Motren?</h4>
          <div className='flex gap-3 mt-8'>
            <button className="px-5 py-3 bg-primary_button text-white rounded shadow hover:-translate-y-2 transition-all flex items-center gap-2">
              <MdRocketLaunch />
              <span>Join Us</span>
            </button>
            <button className="px-5 py-3 bg-secondary_button text-white rounded shadow hover:-translate-y-2 transition-all flex items-center gap-2" onClick={()=>{navigate("/main/project")}}>
              <IoIosAddCircle />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
