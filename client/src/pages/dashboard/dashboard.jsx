import Account from '@/components/common/account'
import BottomNav from '@/components/common/header'
import AddInvestment from '@/components/dashboard-view/addInvestment'
import BadgeCard from '@/components/dashboard-view/badgeCard'
import GraphCard from '@/components/dashboard-view/graphCard'
import ProfileCard from '@/components/dashboard-view/profileCard'
import ProjectCard from '@/components/dashboard-view/projectCard'
import React, { useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import rotatingMail from "../../assets/rotating-coin.gif";

const Dashboard = () => {

    const {user} = useSelector((state)=>state.auth);
    const [showEnvelop,setShowEnvelop] = useState(false);
    const [openedEnvelopeId, setOpenedEnvelopeId] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    

    const envelopeMessages = [
        { id: 1, message: {
            to : {
              name : user?.userName,
              MCID : user?.MCID
            },
            from : {
              name : "Motren-Team"
            },
            content : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        } },
        { id: 2, message: "A crown for your consistency 👑 Keep shining!" },
        { id: 3, message: "Just a reminder: You're making great progress 🚀" },
        
    ];

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
                
                <div className='flex flex-col gap-4 w-full' >
                    <div onClick={()=>setShowEnvelop(true)}>
                        <BadgeCard/>
                    </div>
                    
                    <AddInvestment/>
                </div>

                <div className='flex flex-col items-center gap-6'>
                    <ProjectCard/>
                    <GraphCard/>
                </div>
            </div>
        </div>
        {showEnvelop && (
                <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]'>
                  <div className='bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl relative w-[90%] max-w-[600px] max-h-[80%] overflow-auto'>
        
                    {/* Heading and Close Button */}
                    <div className='flex items-center justify-between mb-6'>
                      <h2 className='text-white text-xl font-semibold'>🎁 Crown for you!</h2>
                      <button
                        onClick={() => {
                          setShowEnvelop(false);
                          setSelectedMessage(null);
                          setOpenedEnvelopeId(null);
                        }}
                        className="text-white bg-black/30 p-2 rounded hover:bg-black/50 transition"
                      >
                        ✕
                      </button>
                    </div>
        
                    {/* Envelope Grid */}
                    <div className='grid grid-cols-3 gap-4'>
                      {user?.profile?.envelope?.map((value, i) => (
                        <div
                          key={i}
                          className="cursor-pointer"
                          onClick={() => {
                            setOpenedEnvelopeId(value);
                            const foundMessage = envelopeMessages.find(msg => msg.id === value);
                            setSelectedMessage(foundMessage?.message || "You've got a surprise 🎉");
                            setShowMessagePopup(true); // open the new popup
                          }}            
                        >
                          <img
                            src={rotatingMail}
                            alt={`Envelope ${value}`}
                            className="w-[10rem] h-[10rem] object-contain"
                          />
                        </div>
                      ))}
                    </div>
        
                    {/* Display Selected Message */}
                    
                  </div>
        
                  {/* Letter Pad */}
                  {showMessagePopup && selectedMessage && (
                      <div className="absolute top-10 left-0 w-full h-[30rem] bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center">
                        <div className="relative bg-white text-black w-[850px] h-[90vh] rounded-xl shadow-2xl  p-12 font-serif text-[17px] leading-[1.75rem]">
        
                            {/* Close Button */}
                            <button
                              onClick={() => setShowMessagePopup(false)}
                              className="absolute top-4 right-4 text-black text-lg px-3 py-1 rounded hover:bg-gray-200 transition"
                            >
                              ✕
                            </button>
        
                            {/* Header */}
                            <div className="mb-6">
                              <h2 className="text-2xl font-bold mb-2">Letter from {selectedMessage?.from?.name || "Motren Team"}</h2>
                              <p><strong>To:</strong> {selectedMessage?.to?.name} ({selectedMessage?.to?.MCID})</p>
                              <p><strong>Date:</strong> {new Date(selectedMessage?.date || Date.now()).toLocaleDateString()}</p>
                            </div>
        
                            <hr className="my-4 border-gray-300" />
        
                            {/* Body Content */}
                            <div className="whitespace-pre-wrap text-justify">
                              {selectedMessage?.content || selectedMessage}
                            </div>
        
                            {/* Footer */}
                            <div className="mt-12">
                              <p>Sincerely,</p>
                              <p className="font-semibold">{selectedMessage?.from?.name || "Motren Team"}</p>
                            </div>
                          </div>
                      </div>
                    )}
                </div>
              )}

        
    </div>
  )
}

export default Dashboard
