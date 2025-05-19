import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsByUser } from '@/store/project-slice';
import "swiper/css";
import "swiper/css/effect-cards";
import devImg from "../../assets/User_img.png";


const Tracker = () => {

  const { user } = useSelector((state) => state.auth);
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

  const bgColors = [
    'bg-red-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-pink-200',
    'bg-orange-200'
  ];

  const getDaysRemaining = (project) => {
    if (!project?.submissionDate) return null;

    const today = new Date();
    const projectDate = new Date(project?.submissionDate);

    const diffTime = projectDate.getTime() - today.getTime();

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? `${diffDays} days left` : "Delivery today!";
};

  return (
    <div className="w-full flex justify-center mt-12 font-poppins">
      <div className="w-[350px] h-[300px]">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="w-full h-full"
        >
          {project.map((pro, idx) => (
            <SwiperSlide key={pro._id}>
              <div className={`rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center h-full text-center transition duration-300 ease-in-out ${bgColors[idx % bgColors.length]}`}>
                <div className='w-full flex items-center justify-between gap-3'>
                  <h2 className='text-[1.2rem] font-medium w-[65%] text-start '>{pro.title}</h2>
                  <p className='text-[1rem] font-light'>{getDaysRemaining(pro)}</p>
                </div>
                <p className='text-start w-full p-3 text-gray-600 text-[.8rem] h-[40%] overflow-clip'>{pro.description}</p>
                <div className='flex w-full items-center justify-between mt-3'>
                  <p className='text-[.9rem] flex gap-3'> Status : <p className={pro.metadata.status==="waiting" ? 'text-green-800' : 'text-orange-400'}>{pro.metadata.status}</p></p>
                  <img src={devImg} alt="" className='w-[5rem] mt-2'/>
                </div>
                <div className='w-full flex  items-start justify-start gap-3 mt-2 text-[.8rem]'>
                  <h2 className=''>Progress : </h2>
                  {
                    pro.metadata.status==="waiting" ? 
                    (<>Not yet confirmed !</>) : (
                      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{
                                width: `${
                                    pro?.progress && pro?.fullProgress
                                        ? Math.min(
                                            (parseFloat(pro.progress) /
                                                parseFloat(pro.fullProgress)) *
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
                <a className='bg-primary_button text-white mt-5 px-6 py-2 rounded' href='www.google.com'>Join!</a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Tracker;
