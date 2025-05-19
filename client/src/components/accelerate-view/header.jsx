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

const AccelerateHeader = ({screen}) => {

  const {user} = useSelector((state)=>state.auth);
  // console.log("Accelerate Module",user);
  const [active,setActive] = useState("");
  const [openBtn,setOpenBtn] = useState("");

  useEffect(()=>{
    setActive(user?.role);
    console.log("Role",active);
    
  },[]);



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
      <div className='absolute inset-0 z-50 flex items-center justify-center  -top-40 font-poppins '>
        <div className="text-white text-center space-y-4 flex flex-col gap-5">
          <h2 className="text-4xl font-semibold">Accelerate your Impact</h2>
          <div className='flex w-full items-center justify-center gap-3 '>
            <div className='flex flex-col z-20 cursor-pointer' onClick={()=>screen(0)}>
              <div className={openBtn===1 ? 'w-30 px-6 py-3 rounded-3xl bg-sub_btn flex items-center justify-center gap-2 -translate-y-3 transition-all' : 'w-30 px-6 py-3 rounded-3xl bg-sub_btn flex items-center justify-center gap-2'} onClick={()=>{setOpenBtn(1)}}>
                  <FaUser />
                  <h2 className="">Subscriber</h2>
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

            <div className='flex flex-col w-full h-full cursor-pointer' onClick={()=>screen(1)}>
              <div className={openBtn===2 ? 'w-30 px-6 py-3 rounded-3xl bg-dev_btn flex items-center justify-center gap-2 -translate-y-3 transition-all' : 'w-30 px-6 py-3 rounded-3xl bg-dev_btn flex items-center justify-center gap-2'} onClick={()=>setOpenBtn(2)}>
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

            <div className='flex flex-col cursor-pointer' onClick={()=>screen(2)}>
              <div className={openBtn===3 ? 'w-30 px-6 py-3 rounded-3xl bg-col_btn flex items-center justify-center gap-2 -translate-y-3 transition-all' : 'w-30 px-6 py-3 rounded-3xl bg-col_btn flex items-center justify-center gap-2'} onClick={()=>setOpenBtn(3)}>
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
    </div>
  )
}

export default AccelerateHeader
