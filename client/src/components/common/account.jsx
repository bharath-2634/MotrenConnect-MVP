import React, { useEffect, useState, useRef } from 'react';
import { IoIosNotifications } from "react-icons/io";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import envelop from "../../assets/envelop_gif.gif";
import { FaCrown } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import { RiFundsFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { fetchUserById, logoutUser } from '@/store/auth-slice';
import { useNavigate } from 'react-router-dom';
import rotatingMail from "../../assets/rotating-coin.gif";
// import rotatingCrown from "../../assets/crown_gif.gif";




const Account = () => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  // Envelop PopUp and letter Pad
  const [showEnvelop,setShowEnvelop] = useState(false);
  const [openedEnvelopeId, setOpenedEnvelopeId] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessagePopup, setShowMessagePopup] = useState(false);

  // Crown PopUp
  const [showCrown,setShowCrown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownRef = useRef();

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchUserById(user?.userId));
    }
  }, [user?.userId]);

  useEffect(() => {
    setUserName(user?.userName);
  }, [user]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  const envelopeMessages = [
    { id: 1, message: {
        to : {
          name : user?.userName,
          MCID : user?.MCID
        },
        from : {
          name : "Motren-Team"
        },
        content : `Dear ${user?.userName},\n Thank you for choosing MotrenConnect — a platform where your freelance journey does more than just build careers; it builds lives. By joining us, you’re not only embracing new opportunities for your own growth but also becoming a vital part of a mission that reaches far beyond the screen. \n Every project you take on through MotrenConnect directly supports orphaned children, giving them access to better education, care, and a brighter future. \n Your trust in our platform means the world to us — and even more to the children whose lives you help change every day. Together, we are proving that work can be purposeful, and that talent, when shared with heart, creates impact that lasts a lifetime. We’re excited to have you with us on this meaningful journey. \n With heartfelt thanks,\nThe MotrenConnect Team \nEmpowering Work. Changing Lives.`
    } }, 
    
    { id: 2, message: {
        to : {
          name : user?.userName,
          MCID : user?.MCID
        },
        from : {
          name : "Motren-Team"
        },
        content : `Dear ${user?.userName},\n Thank you for choosing MotrenConnect — a platform where your freelance journey does more than just build careers; it builds lives. By joining us, you’re not only embracing new opportunities for your own growth but also becoming a vital part of a mission that reaches far beyond the screen. \n Every project you take on through MotrenConnect directly supports orphaned children, giving them access to better education, care, and a brighter future. \n Your trust in our platform means the world to us — and even more to the children whose lives you help change every day. Together, we are proving that work can be purposeful, and that talent, when shared with heart, creates impact that lasts a lifetime. We’re excited to have you with us on this meaningful journey. \n With heartfelt thanks,\nThe MotrenConnect Team \nEmpowering Work. Changing Lives.`
    } },
   { id: 3, message: {
        to : {
          name : user?.userName,
          MCID : user?.MCID
        },
        from : {
          name : "Motren-Team"
        },
        content : `Dear ${user?.userName},\n Thank you for choosing MotrenConnect — a platform where your freelance journey does more than just build careers; it builds lives. By joining us, you’re not only embracing new opportunities for your own growth but also becoming a vital part of a mission that reaches far beyond the screen. \n Every project you take on through MotrenConnect directly supports orphaned children, giving them access to better education, care, and a brighter future. \n Your trust in our platform means the world to us — and even more to the children whose lives you help change every day. Together, we are proving that work can be purposeful, and that talent, when shared with heart, creates impact that lasts a lifetime. We’re excited to have you with us on this meaningful journey. \n With heartfelt thanks,\nThe MotrenConnect Team \nEmpowering Work. Changing Lives.`
    } },
    
  ];

  

  return (
    <div className='fixed top-5 right-10 text-white flex items-center justify-center gap-2 z-20' ref={dropdownRef}>
      <div className='flex items-center justify-center border-gray-500 px-2 py-1 border-[.1rem] 
        rounded-[.5rem] relative w-[48px] h-[40px]' onClick={()=>{setShowEnvelop(true)}}>
        <img 
          src={envelop}
          alt="Envelope Icon" 
          className='w-[60px] h-[40px] object-contain' 
        />
        <div className='absolute -top-2 -right-2 bg-[#453FF3] text-white text-[10px] font-bold 
          w-5 h-5 flex items-center justify-center rounded-full shadow-md'>
          {user?.profile?.envelope.length}
        </div>
      </div>


      {/* Envelop Module */}
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


      {/* Crown Module*/}
      <div className='flex items-center justify-center border-gray-500 px-3 py-[.6rem] border-[.1rem] 
        rounded-[.5rem] relative' onClick={()=>setShowCrown(true)}>
        <FaCrown className='text-yellow-500 text-[1.2rem]'/>
        <div className='absolute -top-2 -right-2 bg-[#453FF3] text-white text-[10px] font-bold 
          w-5 h-5 flex items-center justify-center rounded-full shadow-md'>
          {user?.profile?.crown} 
        </div>

        {
          showCrown && (
            <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]'>
              <div className='bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl relative w-[90%] max-w-[600px] max-h-[80%] overflow-auto'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-white text-xl font-semibold'>🎁 Crown for you!</h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCrown(false)}}
                    className="text-white bg-black/30 p-2 rounded hover:bg-black/50 transition"
                  >
                    ✕
                  </button>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                  {Array.from({ length: user?.profile?.crown || 0 }).map((_, index) => (
                    <img
                      key={index}
                      src={envelop} // Update this path based on where your crown gif is stored
                      alt='Crown'
                      className='w-[10rem] h-[10rem] mx-auto'
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        }

      </div>

      {/* Username & Dropdown */}
      <div className='relative'>
        <div
          className='flex items-center border-gray-500 justify-center px-2 py-[.3rem] border-[.1rem] 
          rounded-[.5rem] cursor-pointer gap-1'
          onClick={toggleDropdown}
        >
          <h2 className='font-poppins text-[1rem]'>{userName || "Get Started"}</h2>
          {showDropdown ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className='absolute right-0 top-[120%] w-[210px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg z-50'>

            {/* Crown/Points */}
            <div className='grid grid-cols-2 gap-3 mb-3 font-poppins'>
              <div className='flex flex-col items-center bg-black/30 rounded-xl p-2'>
                <span className='text-yellow-100'><FaCrown className='text-yellow-500 text-[1.2rem]'/></span>
                <p className='text-xs mt-2'>{user?.profile?.crown} crowns</p>
              </div>
              <div className='flex flex-col items-center bg-black/30 rounded-xl p-2'>
                <FaEnvelope className='text-violet-700 text-[1.2rem]'/>
                <p className='text-xs mt-2'>{user?.profile?.envelope.length} covers</p>
              </div>
              <div className='flex flex-col items-center bg-black/30 rounded-xl p-2'>
                <FaCoins className='text-yellow-500 text-[1.2rem]'/>
                <p className='text-xs mt-2'>{user?.profile?.points} coins</p>
              </div>
              <div className='flex flex-col items-center bg-black/30 rounded-xl p-2'>
                <RiFundsFill className='text-violet-700 text-[1.2rem]'/>
                <p className='text-xs mt-2'>{1000- user?.profile?.fundGrade} rank</p>
              </div>
            </div>

            {/* Divider */}
            <div className='border-t border-white/20 my-2'></div>

            {/* Menu Items */}
            <div className='space-y-2 font-poppins'>
              <div className='hover:text-violet-300 cursor-pointer flex gap-2 items-center justify-start'>
                <span><IoSettings className='text-[1.2rem] text-white'/></span> 
                <h2 className=''>Settings</h2>
              </div>
              <div className='hover:text-violet-300 cursor-pointer flex gap-2 items-center' onClick={()=>{navigate("/profile/profile/basic")}}>
                <span><CiUser className='text-[1.2rem] text-white'/></span> 
                <h2 className=''>Profile</h2>
              </div>
              <div className='hover:text-red-400 cursor-pointer flex gap-2 items-center' onClick={()=>{handleLogout()}}>
                <span><FiLogOut className='text-[1.2rem] text-white'/></span> 
                <h2 className=''>logout</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
