import React, { useState } from 'react'
import BottomNav from '../common/header'
import Account from '../common/account'
import AccelerateHeader from './header'
import { Outlet } from 'react-router-dom'
import Subscriber from '@/pages/accelerate/subscriber'
import Developer from '@/pages/accelerate/developer'
import Contributor from '@/pages/accelerate/contributor'
import Footer from '../common/footer'

const AccelerateLayout = () => {

  const [screens,setScreens] = useState(0);

  
  return (
    <div className='bg-primary w-full h-full'>
      <BottomNav/>
      <Account/>
      <div className='w-full  overflow-hidden'>
        <AccelerateHeader screen={setScreens}/>
      </div>
      {
        screens === 0 ? (
          <Subscriber/>
        ) : screens === 1 ? (
          <Developer/>
        ) : screens === 2 ? (
          <Contributor/>
        ) : null
      }
      <Footer/>
    </div>
  )
}

export default AccelerateLayout
