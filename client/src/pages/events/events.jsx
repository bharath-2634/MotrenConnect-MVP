import React from 'react'
import { FaChevronLeft } from "react-icons/fa";

const Events = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-4 p-4'>
        
        <div className='w-full flex items-start justify-start '>
            <FaChevronLeft onClick={()=>history.back()} className='text-white '/>
        </div>

    </div>
  )
}

export default Events
