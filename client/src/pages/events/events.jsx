import { fetchActiveEvent } from '@/store/event-slice';
import React, { useEffect } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch } from 'react-redux';

const Events = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchActiveEvent()).then((data)=>console.log(data)).catch((error)=>console.log(error));
    },[]);

  return (
    <div className='w-full flex flex-col items-center justify-center gap-4 p-4'>
        
        <div className='w-full flex items-start justify-start '>
            <FaChevronLeft onClick={()=>history.back()} className='text-white '/>
        </div>

        {/* Main Event Card */}



    </div>
  )
}

export default Events
