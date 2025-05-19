import Account from '@/components/common/account';
import BottomNav from '@/components/common/header';
import { fetchActiveEvent } from '@/store/event-slice';
import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import img1 from "../../assets/orhpan_main_img_1.jpg";
import img2 from "../../assets/orphan_main_img_2.jpg";
import img3 from "../../assets/orphan_main_img_3.jpg";
import img4 from "../../assets/orphan_main_img_4.jpg";
import img5 from "../../assets/orphan_main_img_5.jpg";
import ImageSlider from '@/components/event-view/eventPoster';
import { MdLocationPin } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import educate from "../../assets/educate.jpg";
import help from "../../assets/help.jpg";
import video from "../../assets/pongal.mp4";
import video1 from "../../assets/Kids.mp4";
import birthday from "../../assets/birthday.jpg";
import birthday1 from "../../assets/birthday1.png";
import event from "../../assets/event.png";
import event1 from "../../assets/event1.png";
import pongal from "../../assets/pongal.png"
import PaymentPopUp from '@/components/event-view/paymentPopUp';
import { updateUserProfile } from '@/store/auth-slice';
import noEvent from "../../assets/noEvents.gif";
import Faq from '@/components/common/faq';
import Footer from '@/components/common/footer';


const Events = () => {

    const images = [
        img1,img2,img3,img4,img5
    ];

    const subEventsImages = [
        img1,img2,img3,img4,img5
    ]

    // const [stepAtClose,setStepAtClose] = useState(false)

    const dispatch = useDispatch();

    const [eventData,setEventData] = useState();
    const [showPopup, setShowPopup] = useState(false);

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

    const content = [
        {
          title: "Pongal Celebrations with Our Grandparents at Heart",
          description:
            "As college students, we had the joy of celebrating Pongal with the lovely elders at the old age home. From sharing traditional sweets to exchanging stories and smiles, it was a heartwarming day filled with love, laughter, and unforgettable memories.",
          video: video,
        },
        {
          title: "Spreading Smiles at the Orphanage",
          description:
            "As college students, we spent a heartwarming day at the orphanage, sharing laughter, stories, and joy with the kids. It was a day filled with meaningful connections, playful moments, and memories we'll cherish forever.",
          video: video1,
        },
    ];

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
    
    // const handleGratitudeComplete = () => {
      // const updatedUser = {
      //   ...user,
      //   profile :{
      //     ...user?.profile,
      //     envelope : [...(user?.profile?.envelope || []),3],
      //     eventCount : user?.profile?.eventCount+1,
      //     fundGrade : user?.profile?.fundGrade+100,
      //     points : user?.profile?.points+30
      //   }
      // };
      // console.log("Updated User Profile",updatedUser);
      // dispatch(updateUserProfile(updatedUser));
    // };

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
    <div className='w-full flex flex-col items-center justify-center gap-4 p-4 font-poppins'>
        <BottomNav/>
        <Account/>
        <div className='w-full flex items-start justify-start '>
            <FaChevronLeft onClick={()=>history.back()} className='text-white '/>
        </div>

        {
          eventData==="No active event found" && 
          <div className='flex flex-col w-full items-center justify-center gap-0 p-6'>
            <img src={noEvent} alt="MotrenConnect" className='w-[15rem]'/>
            <h2 className='text-white'>No event active now ! stay active</h2>
          </div>
        }
        {/* Main Event Card */}
        { eventData!="No active event found" && <div className='w-[90%] bg-primary_box rounded flex items-center justify-center gap-10 p-3 mt-10'>
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
    handlePopupClose
    // Optionally trigger toast or other UI updates
  }}
  user={user} // from Redux or props
  amount={100} // donation amount
/>

            </div>
        </div>}
        {/* Sub Event Card */}
        {eventData!="No active event found" && <div className='w-[90%] flex items-center justify-between gap-3'>
            <div className='w-full bg-primary_box rounded flex flex-col items-center justify-center gap-4 mt-5 p-4'>
                <h2 className='text-white text-start w-full'>About The Event</h2>
                <p className='text-gray-400 text-[.8rem]'>Join us for cozy, homely events that are designed to bring the warmth of family gatherings to our friends. Our events bring people together and make lasting memories over amazing conversations. We can't wait to see you there!
                 You can call us at +91 7845425982 to RSVP  you wish to nominate for our next event!</p>

                <div className='flex items-start justify-start gap-3 w-full'>
                    
                    {
                        eventData?.onSpotEvents.map(({Name,poster,time})=>{
                            return <div className='flex flex-col items-start justify-start gap-2'>
                                <img src={img1} alt="" className='w-[7rem] h-[7rem] rounded items-start'/>
                                <div className='flex items-center justify-between gap-4 w-full'>
                                    <h2 className='text-white'>{Name}</h2>
                                    <p className='text-[.8rem] text-gray-400'>Time:{time}</p>
                                </div>
                                
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='w-[30%] bg-primary_box rounded flex flex-col items-start justify-start gap-5 mt-5 p-4'>
                <h2 className='text-white'>Support us to serve better !</h2>
                <h2 className='text-white text-start w-full font-medium text-[1.1rem]'> Event Coordinators</h2>
                <div className='w-full flex flex-col items-start justify-start gap-3'>
                    {
                        eventData?.eventCoordinators?.map(({Name,contact})=>{
                            return <div className='w-full flex items-center justify-center gap-3 text-[.8rem]'>
                                <h2 className='text-white'>{Name}</h2>
                                <p className='flex items-center gap-1 text-white'><FaPhoneAlt /> {contact}</p>
                            </div>
                        })
                    }

                </div>
                <h2 className='flex w-full items-center justify-start gap-3 text-white text-[.9rem]'><MdHelpCenter />Help center</h2>
                <div className='w-full flex items-center justify-center gap-10 text-[.8rem]'>
                    <p className='text-white'>Bharath</p>
                    <p className='flex items-center gap-1 text-white'><FaPhoneAlt /> +91 7845425982</p>
                </div>
                <button className='w-full rounded px-6 py-2 bg-primary_button text-white justify-end' onClick={()=>setShowPopup(true)}>Fund now!</button>
                <PaymentPopUp isOpen={showPopup} onClose={handlePopupClose}/>
            </div>
        </div>}

        {/* Down the Ground Actual Implementation */}
        <div className='flex flex-col w-full items-center justify-center gap-5 p-6'>

                <div className="w-full flex items-center justify-center gap-6  p-6 ">
                    <div className="rounded-full overflow-hidden w-[30%] h-[50%]">
                        <img src={help} alt="" />
                    </div>
                    <div className='h-full w-[70%] flex flex-col items-start justify-center gap-6 p-6 text-white'>
                    <h1 className="text-3xl font-semibold" >Discover the joy of Quality time</h1>
                    <p className="text-xl text-gray-400 mt-5">As college students, we had the meaningful opportunity to guide and assist the elderly at the old age home. From helping with daily activities to offering companionship and tech support, it was a day filled with learning, empathy, and heartfelt connections.</p>
                    <p>~ <span className='text-blue-500'>MotrenConnect</span> - <span className='text-red-400'>With love and care</span> </p>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center gap-6  p-6 ">
                    
                    <div className='h-full w-[70%] flex flex-col items-start justify-center gap-6 p-6 text-white'>
                    <h1 className="text-3xl font-semibold" >Discover the joy of Quality time</h1>
                    <p className="text-xl text-gray-400 mt-5">As college students, we had the meaningful opportunity to guide and assist the elderly at the old age home. From helping with daily activities to offering companionship and tech support, it was a day filled with learning, empathy, and heartfelt connections.</p>
                    <p>~ <span className='text-blue-500'>MotrenConnect</span> - <span className='text-red-400'>With love and care</span> </p>
                    </div>

                    <div className="rounded-full overflow-hidden w-[30%] h-[50%]">
                        <img src={educate} alt="" />
                    </div>
                </div>
        </div>


        {content.map((ele, ind) => (
          <div className="text-white flex items-center justify-center flex-col px-10 py-20 gap-11" key={ind}>
            <div className="w-[70%] flex items-center justify-center flex-col text-center">
              <h1 className="text-3xl text-primary_button font-poppins font-semibold">
                {ele.title}
              </h1>
            </div>
            <div className="w-[80%] flex items-center justify-center text-center">
              <p className="font-poppins text-xl">{ele.description}</p>
            </div>
            <div>
              <video
                width={600}
                height={600}
                controls
                className="rounded-xl shadow-lg"
              >
                <source src={ele.video} type="video/mp4" />
              </video>
            </div>
          </div>
      ))}


        <div className="grid grid-cols-4 grid-rows-2 gap-4 px-10 py-20 w-screen h-screen">
          <div className="col-span-1 row-span-1">
            <img
              src={birthday}
              alt="Image 1"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 row-span-1">
            <div className="text-white text-center flex items-center justify-center flex-col gap-5 font-poppins">
              <h1 className="text-3xl font-semibold">Cherishing Moments with Our Elders</h1>
              <p className="text-xl">We celebrated a joyful event at the old age home, spending quality time with the elders through laughter, conversations, and cultural activities. As college students, it was a heart-touching experience that reminded us of the value of love, respect, and shared memories across generations.</p>
            </div>
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src={event}
              alt="Image 3"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src={pongal}
              alt="Image 4"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 row-span-1">
            <img
              src={birthday1}
              alt="Image 5"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src={event1}
              alt="Image 6"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      

      <Footer/>
    </div>
  )
}

export default Events
