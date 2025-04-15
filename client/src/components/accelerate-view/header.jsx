import React, { useEffect, useState } from 'react'
import "../styles/style.css";
import Spline from "@splinetool/react-spline";
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { FaCode } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import CarouselComponent from './carousel';
import { Outlet } from 'react-router-dom';

const AccelerateHeader = () => {

  const {user} = useSelector((state)=>state.auth);
  // console.log("Accelerate Module",user);
  const [active,setActive] = useState("");

  useEffect(()=>{
    setActive(user?.role);
    console.log("Role",active);
  },user);

  // if(isLoading) {
  //   return <></>
  // }
  return (
    <div className='custom-bg w-full flex flex-col items-center justify-center h-screen relative'>

      {/* Background Spline */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/W3Y6Mmrlxdcust1S/scene.splinecode" className='w-full h-full'/>
      </div>

      {/* Center Globe Spline */}
      <div className="absolute left-1/2 top-96 -translate-x-1/2 -translate-y-1/2 z-10 w-[30rem] h-[30rem] rounded-full overflow-hidden shadow-xl border border-white/20 backdrop-blur-md">
        <Spline scene="https://prod.spline.design/fSJuMGjAXbKBVt50/scene.splinecode" className='w-full h-full'/>
      </div>

      {/* Overlay Content */}
      <div className='absolute inset-0 z-20 flex items-center justify-center pointer-events-none -top-40 font-poppins '>
        <div className="text-white text-center space-y-4 flex flex-col gap-5">
          <h2 className="text-4xl font-semibold">Accelerate your Impact</h2>
          <div className='flex w-full items-center justify-center gap-3 '>
            <div className='flex flex-col '>
              <div className='w-30 px-6 py-3 rounded-3xl bg-sub_btn flex items-center justify-center gap-2'>
                  <FaUser />
                  <h2>Subscriber</h2>
                  
                </div>
                {
                    active==="subscriber" && (
                      <div className='flex items-center justify-center gap-0'>
                        <TiTick className='text-green-600'/>
                        <p className='text-[.7rem]'>current role</p>
                      </div>
                    )
                }
            </div>

            <div className='flex flex-col hover:translate-x-4 w-full h-full'>
              <div className='w-30 px-6 py-3 rounded-3xl bg-dev_btn flex items-center justify-center gap-2'>
                  <FaCode />
                  <h2>Developer</h2>
                  
                </div>
                {
                    active==="developer" && (
                      <div className='flex items-center justify-center gap-0'>
                        <TiTick className='text-green-600'/>
                        <p className='text-[.7rem]'>current role</p>
                      </div>
                    )
                }
            </div>

            <div className='flex flex-col'>
              <div className='w-30 px-6 py-3 rounded-3xl bg-col_btn flex items-center justify-center gap-2'>
                <RiUserShared2Fill />
                  <h2>Contributor</h2>
                </div>
                {
                    active==="contributor" && (
                      <div className='flex items-center justify-center gap-0'>
                        <TiTick className='text-green-600'/>
                        <p className='text-[.7rem]'>current role</p>
                      </div>
                    )
                }
            </div>
              
          </div>
        </div>
        
      </div>

      <div className="absolute -bottom-40 z-10 w-[90rem] flex items-center justify-center">
        <div className="w-full opacity-90">
          <CarouselComponent />
        </div>
      </div>
    </div>
  )
}

export default AccelerateHeader
