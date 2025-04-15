import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from '../common/header'
import Account from '../common/account'
import ProfileCard from './profileCard'
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";

const ProfileLayout = () => {
  return (
    <div className='flex items-start flex-col justify-start gap-3 bg-primary w-full p-8'>
        <span onClick={()=>{window.history.back()}}><IoChevronBack className='text-white font-poppins text-[1.6rem]'/></span>
        <Account/>
        <BottomNav/>
        <ProfileCard/>
        <div className='w-full'>
          <Outlet/>
        </div>
    </div>
  )
}

export default ProfileLayout
