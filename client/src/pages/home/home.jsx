import React from 'react'
// import HorizontalScroll from './collaborate'
import Tracker from './tracker'
import HomeHeader from '@/components/home-view/homeHeader'
import GraphCard from '@/components/dashboard-view/graphCard'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
        <HomeHeader/>
        <div className='flex flex-col items-center w-full p-5 justify-center gap-10'>
          <h2 className='text-white font-semibold font-poppins text-[1.6rem]'>Track your Progress </h2>
          <div className='flex w-full items-center justify-center gap-3'>
            <div className='w-[150%] flex items-center justify-center mr-12'>
              <Tracker/>
            </div>
            <div className='w-[100%] mt-8 -ml-6'>
              <GraphCard/>
            </div>
            
          </div>
          <br /><br />
        </div>
    </div>
  )
}

export default Home
