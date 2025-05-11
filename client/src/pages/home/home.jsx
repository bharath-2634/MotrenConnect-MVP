import React, { useEffect, useState } from 'react'
// import HorizontalScroll from './collaborate'
import Tracker from './tracker'
import HomeHeader from '@/components/home-view/homeHeader'
import GraphCard from '@/components/dashboard-view/graphCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActiveEvent } from '@/store/event-slice'
import { updateUserProfile } from '@/store/auth-slice'
import img1 from "../../assets/orhpan_main_img_1.jpg";
import img2 from "../../assets/orphan_main_img_2.jpg";
import img3 from "../../assets/orphan_main_img_3.jpg";
import img4 from "../../assets/orphan_main_img_4.jpg";
import img5 from "../../assets/orphan_main_img_5.jpg";
import ImageSlider from '@/components/event-view/eventPoster';
import { MdLocationPin } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import PaymentPopUp from '@/components/event-view/paymentPopUp'
import Faq from '@/components/common/faq'
import Footer from '@/components/common/footer'
import { fetchLinkedInPosts } from '@/store/post-slice'
import noEvent from "../../assets/noEvents.gif";

const Home = () => {

    const dispatch = useDispatch();

    const {posts} = useSelector((state)=>state.linkedin);
    console.log("posts",posts);

    useEffect(()=>{
      dispatch(fetchLinkedInPosts()).then(()=>console.log("Successful webscrapping !")).catch((error)=>console.log("error !"));
    },[]);

    const [eventData,setEventData] = useState();
    const [showPopup, setShowPopup] = useState(false);

     const images = [
            img1,img2,img3,img4,img5
        ];

    useEffect(()=>{
      console.log(showPopup);
    },[]);

    useEffect(()=>{
        dispatch(fetchActiveEvent()).then((data)=>setEventData(data.payload)).catch((error)=>console.log(error));
        // console.log("EventData: "+JSON.stringify(eventData,null,2));

        if(!eventData) {
          console.log("No event Data found !");
        }
    },[]);

    const getDaysRemaining = () => {
      if (!eventData?.eventDate) return null;
  
      const today = new Date();
      const eventDate = new Date(eventData?.eventDate);

      const diffTime = eventDate.getTime() - today.getTime();

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      return diffDays > 0 ? `${diffDays} days to go` : "Event Started";
  };

  const openMap = () => {
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = `${latitude},${longitude}`;
        const targetLocation = eventData?.eventLocation;
        const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation}&destination=${encodeURIComponent(targetLocation)}`;
        window.open(mapUrl, "_blank");
      },
      (error) => {
        // If user denies location access or fails, just show destination
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(targetLocation)}`;
        window.open(mapUrl, "_blank");
      }
    );
  };

  const { user, isAuthenticated, isLoading }  = useSelector((state)=>state.auth);
  console.log("user",user);

  const handlePopupClose = (stepAtClose) => {
        console.log("step",stepAtClose);
        setShowPopup(false)
        if (stepAtClose === "thanks") {
          const updatedUser = {
            ...user,
            profile: {
              ...user?.profile,
              envelope: [...(user?.profile?.envelope || []), 3],
              eventCount: (user?.profile?.eventCount || 0) + 1,
              fundGrade: (user?.profile?.fundGrade || 0) + 100,
              points: (user?.profile?.points || 0) + 30,
            },
          };
          dispatch(updateUserProfile(updatedUser));
        }
        
        console.log(user?.profile?.eventCount);
    };


  return (
    <div className='flex flex-col items-center justify-center gap-3 font-poppins'>
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
        </div>
        {/* Events Card and Section on the front */}
        <div className='flex flex-col mt-10 p-6 items-center justify-center gap-3'>

<h2 className='text-white font-semibold font-poppins text-[1.6rem]'>Join us on the Special Event</h2>
{
  eventData==="No active event found" && 
  <div className='flex flex-col w-full items-center justify-center gap-0 p-6'>
    <img src={noEvent} alt="MotrenConnect" className='w-[15rem]'/>
    <h2 className='text-white'>No event active now ! stay active</h2>
  </div>
}
{ eventData!="No active event found" && 
  <div className='w-[90%] bg-primary_box rounded flex items-center justify-center gap-10 p-3 mt-10'>
  {/* Image Gallary */}
  <div className=''>
      <ImageSlider images={images}/>
  </div>
  <div className='flex flex-col items-start justify-center gap-3 w-[70%]'>
      <h2 className='text-white text-[1.2rem] font-medium'>{eventData?.eventName}</h2>
      <p className='text-[1rem] text-gray-400'>{eventData?.eventDescription}</p>
      <div className='flex items-center justify-between gap-3 mt-3 w-full'>
          <p className='flex items-center gap-3 text-white'><span><MdLocationPin className='text-red-600'/></span> {eventData?.eventLocation}</p>
          <button className='rounded px-6 py-2 bg-primary_button text-white justify-end' onClick={()=>openMap()}>Open Map</button>
      </div>
      {/* Progress Bar */}
      <div className="w-full flex flex-col gap-2 mt-4">
          <div className="flex justify-between text-white text-sm">
              <span>Raised: ₹{eventData?.fundCollected || 0}</span>
              <span>Goal: ₹{eventData?.targetFund || 0}</span>
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{
                      width: `${
                          eventData?.fundCollected && eventData?.targetFund
                              ? Math.min(
                                  (parseFloat(eventData.fundCollected) /
                                      parseFloat(eventData.targetFund)) *
                                      100,
                                  100
                              )
                              : 0
                      }%`,
                  }}
              ></div>
          </div>
      </div>
      {/* Last section */}
      <div className='w-full flex items-center justify-between gap-4 mt-5'  onClick={() => setShowPopup(true)}>
          <div className='flex flex-col items-start justify-start gap-3' onClick={() => console.log("Clicked")}>
              <div className='flex items-center gap-3 text-white' >
                  <FaCoins className='text-yellow-400'/>
                  <p>Fund raised </p>
              </div>
              <h2 className='text-white'>{eventData?.fundCollected}</h2>
          </div>
        
          
          <div className='flex flex-col items-start justify-start gap-3'>
              <div className='flex items-center gap-3 text-white'>
                  <SlCalender className='text-yellow-400'/>
                  <p>Days left</p>
              </div>
              <h2 className='text-white'>{getDaysRemaining()}</h2>
          </div>

          <button className='rounded px-6 py-2 bg-primary_button text-white justify-end'>Raise Fund</button>
          
      </div>

      {/* <PaymentPopUp isOpen={showPopup} onClose={handlePopupClose}/> */}
      <PaymentPopUp
        isOpen={showPopup}
        onClose={(status) => {
          handlePopupClose(status)
          // Optionally trigger toast or other UI updates
        }}
        user={user} // from Redux or props
        amount={100} // donation amount
      />

      </div>
  </div>
}
        </div>  
        {/* Faq Section */}
        <div className='w-full flex flex-col items-center justify-center gap-3 mt-10'>
        <h2 className='text-white font-semibold font-poppins text-[1.6rem]'>Frequently asked question</h2>
          <Faq/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home
