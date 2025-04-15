import React from 'react'
// import HorizontalScroll from './collaborate'
import Tracker from './tracker'
import HomeHeader from '@/components/home-view/homeHeader'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
        <HomeHeader/>
        <div className='flex flex-col items-center w-full p-5 justify-center gap-10'>
          <h2 className='text-white font-semibold font-poppins text-[1.6rem]'>Track your Progress </h2>
          <Tracker/>
        </div>
    </div>
  )
}

export default Home
