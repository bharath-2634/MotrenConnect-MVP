import Account from '@/components/common/account'
import BottomNav from '@/components/common/header'
import AddInvestment from '@/components/dashboard-view/addInvestment'
import BadgeCard from '@/components/dashboard-view/badgeCard'
import GraphCard from '@/components/dashboard-view/graphCard'
import ProfileCard from '@/components/dashboard-view/profileCard'
import ProjectCard from '@/components/dashboard-view/projectCard'
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'

const Dashboard = () => {


  return (
    <div className='w-full flex flex-col items-center justify-center gap-4'>
        <BottomNav/>
        <Account/>
        <div className='w-full flex items-start justify-start mt-6 ml-10'>
            <FaChevronLeft onClick={()=>history.back()} className='text-white '/>
        </div>
        <div className='flex items-center justify-center gap-3 w-full p-4'>
            {/* First Dashboard */}
            <div className='grid grid-cols-[1fr_1fr_1fr] gap-6 w-full'>
                <div className='w-full'>
                    <ProfileCard/>
                </div>
                
                <div className='flex flex-col gap-4 w-full'>
                    <BadgeCard/>
                    <AddInvestment/>
                    
                </div>

                <div className='flex flex-col items-center gap-6'>
                    <ProjectCard/>
                    <GraphCard/>
                </div>
            </div>
        </div>

        
    </div>
  )
}

export default Dashboard
