import React from 'react'
import logo from "../../assets/logo.png";
import { FaCoins } from "react-icons/fa6"


const GetStarted = () => {
  return (
    <div className='mx-auto lg:w-[60%] md:w-[50%] sm:w-[60%] w-[100%] max-w-md space-y-6 text-center flex flex-col items-center justify-center font-poppins overflow-auto'>
        <div className='bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-[90%] max-w-md flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-3'>
                <div className='bg-white/10 backdrop-blur-lg shadow-lg rounded-[6.4rem] py-[.8rem] px-2 w-[3rem] max-w-md'>
                    <img src={logo} alt="Motren" className='w-[2.2rem] h-full'/>
                </div>
                <h2 className='font-extrabold lg:text-[1.2rem] md:text-[1rem] sm:text-[1rem] text-[1rem]'>Succssfully Subscribed !</h2>
            </div>
            <div className='flex flex-col items-center justify-center gap-3'>
                
                <div className='flex items-center justify-center gap-2'>
                    <FaCoins />
                    <h2>Points</h2>
                </div>
            </div>
        </div>

    </div>
  )
}

export default GetStarted
