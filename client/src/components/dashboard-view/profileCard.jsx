import React from 'react'
import { useSelector } from 'react-redux';
import {
    MapPin,
    Pencil,
    BadgeDollarSign,
    Coins,
    Briefcase,
    Globe,
  } from "lucide-react";
  import {
    FaInstagram,
    FaLinkedin,
    FaGithub,
    FaSnapchat,
    FaGlobe,
  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const profileCard = () => {

    const {user} = useSelector((state)=>state.auth);
    // console.log(user);

    const navigate = useNavigate();
  return (
    <div className="text-white py-6 px-10 rounded-2xl w-[85%] max-w-xl mx-auto shadow-lg flex flex-col justify-between font-poppins bg-[#1e1f20]">
        <div className="flex flex-col items-center gap-2">
          <img
            src={user?.profile?.avatar_url}
            alt="User Avatar"
            className="w-[6rem] h-[6rem] rounded-full border-4 border-primary_button object-cover"
          />
          <div className='flex flex-col items-center justify-center'>
            <h2 className="text-[1.5rem] font-medium text-blue-400">
                Bharath {user?.userName}
            </h2>
            <span className="text-yellow-400 text-[.9rem] font-medium capitalize flex items-center justify-center gap-3">
                <span className='w-2 h-2 rounded-full bg-yellow-400'></span>{user?.role}
            </span>
          </div>
          
          <div className='flex flex-col items-center justify-center gap-1 mt-2'>
            <p className="flex items-center text-sm mt-1 text-gray-300">
                <MapPin className="w-4 h-4 mr-1" /> {user?.profile?.location}
            </p>
            <div className="flex justify-center gap-5 mt-4 text-2xl">
                <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
                <FaGithub className="hover:text-gray-400 cursor-pointer" />
                <FaGlobe className="hover:text-teal-400 cursor-pointer" />
            </div>
          </div>
          <button className="w-full mt-5 bg-[#5A4BFF] hover:bg-[#463acb] py-2.5 rounded-xl flex justify-center items-center gap-2 text-base font-semibold" onClick={()=>{navigate("/profile/profile/basic")}}>
            <Pencil size={16} /> Edit Profile
          </button>
        
          <div className="flex justify-between mt-7  text-lg text-white font-medium gap-[3rem] w-full ">
            <span className="flex flex-col items-center gap-1">
                <p className='text-[.9rem] font-medium'>Fund grand</p>
                <span className="flex items-center gap-2 "><BadgeDollarSign size={18} className='text-yellow-500'/>{user?.profile?.fundGrade}</span>
            </span>
            <span className="flex flex-col items-center gap-1">
                <p className='text-[.9rem] font-medium'>Points gained</p>
                <span className="flex items-center gap-2"><Coins size={18} className='text-yellow-500'/>{user?.profile?.points}</span>
            </span>
          </div>

          <div className="mt-7 text-base flex flex-col gap-4 text-start w-full">
                <h4 className="text-gray-300 font-medium mb-3 text-[1rem]">More about Me !</h4>
                <p className="flex items-center gap-2 mb-2 text-gray-300 text-[1rem]">
                    <Briefcase size={18} className='text-primary_button'/> {user?.profile?.experience?.work}
                </p>
                
                <p className="flex items-center gap-2 text-gray-300 text-lg">
                    <Globe size={18} className='text-primary_button'/> {user?.profile?.location}
                </p>
                
          </div>

          <div className="mt-8 items-start text-center">
            <hr className="mb-5 border-gray-700" />
            <p className="text-base text-gray-300 mb-4 font-medium">
                Connect with Me !
            </p>

            <div className="flex justify-center gap-8 text-3xl">
            <FaInstagram className="hover:text-pink-400 cursor-pointer" />
            <FaSnapchat className="hover:text-yellow-300 cursor-pointer" />
            <FaGithub className="hover:text-gray-300 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
            </div>
          </div>
        

          
        </div>
    </div>
  )
}

export default profileCard
