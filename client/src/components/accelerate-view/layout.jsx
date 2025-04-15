import React from 'react'
import BottomNav from '../common/header'
import Account from '../common/account'
import AccelerateHeader from './header'
import { Outlet } from 'react-router-dom'

const AccelerateLayout = () => {
  return (
    <div className='bg-primary w-full h-full'>
      <BottomNav/>
      <Account/>
      <div className='w-full  overflow-hidden'>
        <AccelerateHeader/>
      </div>
      <Outlet/>
    </div>
  )
}

export default AccelerateLayout
