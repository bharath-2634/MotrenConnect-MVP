import React from 'react'
import { ChevronRight, Target } from 'lucide-react';
import { PiCertificateLight } from 'react-icons/pi'; // for target icon alternative
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import rotatingMail from "../../assets/rotating-coin.gif";
import { useSelector } from 'react-redux';

const BadgeCard = () => {

    const {user} = useSelector((state)=>state.auth);
    console.log(user)

  return (
    <div className="bg-[#1e1f20] text-white rounded-2xl p-6 w-full h-[100%] relative shadow-md flex flex-col gap-5 font-poppins">
      {/* Header */}
      <div className="flex justify-between items-center text-sm px-1">
        <div className="flex items-center gap-1">
          <span className="text-gray-300">Unlocked</span>
          <span className="text-yellow-400 font-semibold">{user?.profile?.envelope.length}</span>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-300">target</span>
          {/* <Target size={14} className="text-yellow-500" /> */}
          <p className='text-yellow-500'>{user?.monthTarget}</p>
        </div>
      </div>

      {/* Badge Image */}
      <div className="flex justify-center items-center mt-6">
        <img
          src={rotatingMail} // replace with your actual badge image
          alt="Badge"
          className="w-44 h-44 object-contain"
        />
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 right-4 text-xs flex items-center text-orange-400 gap-1">
        <span>up next</span>
        <FaRegArrowAltCircleRight size={14} />
      </div>
    </div>
  )
}

export default BadgeCard
