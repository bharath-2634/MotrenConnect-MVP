import ProfileCard from '@/components/profile-view/profileCard'
import ProfileMenu from '@/components/profile-view/profileMenu'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-3 mb-10'>
        {/* <ProfileCard/> */}
        <div className='flex w-full justify-between gap-20 px-10'>
          <ProfileMenu/>
          <Outlet/>
        </div>
        
    </div>
  )
}

export default Profile
