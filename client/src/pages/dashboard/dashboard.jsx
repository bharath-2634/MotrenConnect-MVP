import Account from '@/components/common/account'
import BottomNav from '@/components/common/header'
import AddInvestment from '@/components/dashboard-view/addInvestment'
import BadgeCard from '@/components/dashboard-view/badgeCard'
import GraphCard from '@/components/dashboard-view/graphCard'
import ProfileCard from '@/components/dashboard-view/profileCard'
import ProjectCard from '@/components/dashboard-view/projectCard'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import rotatingMail from "../../assets/rotating-coin.gif";
import { fetchProjectsByUser } from '@/store/project-slice';
import devImg from "../../assets/User_img.png";
import Footer from '@/components/common/footer'

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

    const { project } = useSelector((state) => state.project);
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = user?.userId;
        if (userId) {
          dispatch(fetchProjectsByUser(userId))
            .then(() => console.log("Fetched Successfully!"))
            .catch((error) => console.log(error));
        }
      }, [dispatch, user]);

      console.log("projects from dashboard",project[0]);

      const getDaysRemaining = (project) => {
          if (!project?.submissionDate) return null;

          const today = new Date();
          const projectDate = new Date(project?.submissionDate);

          const diffTime = projectDate.getTime() - today.getTime();

          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return diffDays > 0 ? `${diffDays} days left` : "Delivery today!";
      };

  return (
    <div className='w-full flex flex-col items-center justify-center gap-4 font-poppins'>
        {/* <BottomNav/> */}
        <Account/>
        <div className='w-full flex items-start justify-start mt-6 ml-10'>
            <FaChevronLeft onClick={()=>history.back()} className='text-white '/>
        </div>
        <div className='flex items-center justify-center gap-3 w-full p-4'>
          
            <div className='w-[30%]'>
                <ProfileCard/>
            </div>
            <div className='w-[70%] flex flex-col items-center justify-center gap-3 '>
              <div className='w-full flex items-center justify-between gap-4'>
                  <div onClick={()=>setShowEnvelop(true)} className='w-[60%]'>
                      <BadgeCard/>
                  </div>
                  <AddInvestment/>
              </div>
              <div className='w-full flex items-center justify-between gap-4'>
                  <ProjectCard/>
                  <GraphCard/>
              </div>
              <div className='w-full h-[8rem] flex flex-col items-start justify-start gap-3 mb-16'>
                {/* <h2 className='text-[1.1rem] text-white font-medium'>Current Project !</h2> */}
                {project[0] && <div className='bg-primary_box rounded flex flex-col text-white w-full p-6 gap-4'>
                  <div className='flex items-center justify-between gap-3 w-full'>
                    <h2 className='text-[1.2rem] font-medium'>{project[0].title}</h2>
                    <p>{getDaysRemaining(project[0])}</p>
                  </div>
                  <p className='text-[.8rem] text-gray-400'>{project[0].description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere voluptatum amet fugiat iure ab dicta possimus corporis, saepe ratione obcaecati.</p>
                  <div className='w-full flex items-center justify-between gap-4'>
                    <div className='w-full flex  items-start justify-start gap-3 mt-2 text-[.8rem]'>
                      <h2 className=''>Progress : </h2>
                      {
                        project[0].metadata.status==="waiting" ? 
                        (<>Not yet confirmed !</>) : (
                          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-500"
                                style={{
                                    width: `${
                                        project[0]?.progress && project[0]?.fullProgress
                                            ? Math.min(
                                                (parseFloat(project[0].progress) /
                                                    parseFloat(project[0].fullProgress)) *
                                                    100,
                                                100
                                            )
                                            : 0
                                    }%`,
                                }}
                            ></div>
                        </div>
                        )
                      }
                    </div>
                    <div className='flex items-center justify-center gap-3'>
                      <img src={devImg} alt="" className='w-[5rem]'/>
                      <a className='bg-primary_button text-white px-6 py-2 rounded' href='www.google.com'>Join!</a>
                    </div>
                  </div>
                  
                </div>}
                {/* <div className=' w-full h-[2rem]'>
                  h2 name
                </div> */}
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

              <Footer/>

        
    </div>
  )
}

export default Dashboard
