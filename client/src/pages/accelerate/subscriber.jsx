import React from 'react'
import { useState } from "react";
import DraggableToggleButton from '@/components/accelerate-view/dragBtn';
import { AnimatePresence } from "framer-motion";
import {
  FaDiscord,
  FaGift,
  FaHandHoldingUsd,
  FaPhone,
  FaPlus,
} from "react-icons/fa";
import DraggableToggle from "@/components/accelerate-view/dragBtn";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";


const Subscriber = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [profileHovered, setProfileHovered] = useState(false);
    const [fundHovered, setFundHovered] = useState(false);
    const [locationHovered, setLocationHovered] = useState(false);

    const cards = [
        {
          icon: <FaPlus />,
          text: "Commit a project",
        },
        {
          icon: <FaPhone className="text-green-400" />,
          text: "Connect with controller",
        },
        {
          icon: <FaDiscord className="text-indigo-400" />,
          text: "Discord server",
        },
        {
          icon: <FaGift className="text-yellow-400" />,
          text: "Earn rewards",
        },
    ];

    const containerVariants = {
        initial: { scale: 1, y: 0 },
        hover: {
          scale: 1.05,
          y: -10,
          transition: { type: "spring", stiffness: 200, damping: 15 },
        },
    };

    const childVariants = {
        initial: { opacity: 0, y: 10 },
        hover: (i) => ({
          opacity: 1,
          y: 10,
          transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: "easeOut",
          },
        }),
    };

    const cardVariants = {
        initial: {
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          opacity: 1,
          transition: { type: "spring", stiffness: 200, damping: 20 },
        },
        hovered: (index) => ({
          top:`${index * 60}px`,
          left: "0px",
          x: 10,
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 170,
            damping: 15,
            delay: index * 0.05, // nice cascade effect
          },
        }),
    };


  return (
    <section className="py-16 px-6 bg-[#0f0f0f] text-white font-poppins">
      <div className="text-center mb-8">
        <h1 className="text-[2.5rem] font-medium">Features</h1>
        <p className="text-[1.2rem] font-semibold text-[#ccc] mt-2">
          Motren is simpler, smarter, and transforms lives through meaningful
          projects.
        </p>
      </div>

      {/* ... First Section ... */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-0 items-center mt-20">
        {/* Left */}
        <div
          className="bg-[#8edbff] p-6 rounded-xl w-fit mx-auto relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-[260px] h-[240px]">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="absolute bg-[#1a1a1a] text-white px-3 py-3 rounded-xl shadow flex items-center gap-3 w-56 "
                custom={index}
                initial="initial"
                animate={isHovered ? "hovered" : "initial"}
                variants={cardVariants}
                style={{ zIndex: cards.length - index }}
              >
                {card.icon}
                <span className="text-sm font-medium">{card.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className='-mt-3 flex flex-col items-start justify-between h-full p-4'>
          <h2 className="text-3xl font-semibold mb-4">
            Commit your ideas to projects  <br />{" "}
            <span className="text-white">and Earn rewards</span>
          </h2>
          <div>
            <p className="text-gray-300 mb-3">
                Have an idea? Commit it to Motren projects and see it come to life
            </p>
            <p className="text-gray-300 mb-6">
                Earn rewards while creating a{" "}
                <span className="text-blue-400 font-medium">
                meaningful impact!
                </span>
            </p>
          </div>

          {/* 👇 Draggable toggle button here */}
          <DraggableToggle
            label="Start a Project"
            onToggle={(val) => console.log("Toggled:", val)}
          />
        </div>
      </div>

      {/* Stories */}
      <section className="bg-[#0f0f0f] text-white py-20 px-6 mt-10">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Section 1: Add your story */}
          <div className="grid md:grid-cols-2 gap-12 items-center justify-start ml-20 ">
            {/* Left text */}
            <div className="flex flex-col gap-2 items-start  ml-20 w-full">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-start">
                Add your story and inspire others
              </h2>
              <p className="text-gray-300 mb-6 text-lg text-start">
                Share your journey with the community and make a meaningful
                impact!
              </p>
              <DraggableToggleButton label={"Add your Story"} />
            </div>

            {/* Right card */}
            <motion.div
              className="relative bg-[#8edbff] rounded-2xl shadow-xl w-[300px] min-h-[220px] overflow-hidden flex items-center justify-center p-6 ml-20"
              variants={containerVariants}
              initial="initial"
              animate={profileHovered ? "hover" : "initial"}
              onMouseEnter={() => setProfileHovered(true)}
              onMouseLeave={() => setProfileHovered(false)}
            >
              {/* Animated Profile Icon */}
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={profileHovered ? { x: -110, y: -60 } : { x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="absolute w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shadow-lg cursor-pointer"
              >
                <FaUserAlt className="text-white text-2xl" />
              </motion.div>

              {/* Content */}
              <div className="flex flex-col gap-3 w-full ">
                {/* Profile Info */}
                <motion.div
                  custom={0}
                  variants={childVariants}
                  animate={profileHovered ? "hover" : "initial"}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full "></div>
                  <div>
                    <div className="text-md font-semibold text-primary">
                      Alex Johnson
                    </div>
                    <div className="text-sm">"Learner. Creator. Dreamer."</div>
                  </div>
                </motion.div>

                {/* Story Text */}
                <motion.p
                  custom={1}
                  variants={childVariants}
                  animate={profileHovered ? "hover" : "initial"}
                  className="text-sm text-black mt-1"
                >
                  "Joining this community helped me grow as a developer. I
                  started with zero confidence but now I’ve built two full-stack
                  apps!"
                </motion.p>

                {/* Button */}
                <motion.button
                  custom={2}
                  variants={childVariants}
                  animate={profileHovered ? "hover" : "initial"}
                  className="mt-2 bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition"
                >
                  View Full Story
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Section 2: Add Funds */}
          <div className="grid md:grid-cols-2 gap-0 items-center  px-10">
            {/* Left card */}
            <motion.div
              className="relative bg-[#8edbff] rounded-2xl shadow-xl w-[300px] min-h-[220px] overflow-hidden flex items-center justify-center p-6 ml-[8rem]"
              variants={containerVariants}
              initial="initial"
              animate={fundHovered ? "hover" : "initial"}
              onMouseEnter={() => setFundHovered(true)}
              onMouseLeave={() => setFundHovered(false)}
            >
              {/* Floating Icon + Label */}
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={fundHovered ? { x: -110, y: -74 } : { x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className={`absolute flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-3 rounded-full shadow-lg cursor-pointer`}
              >
                <FaPlus className="text-xl" />
                {!fundHovered && (
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium"
                  >
                    Add Funds
                  </motion.span>
                )}
              </motion.div>

              {/* Card Content */}
              <div className="flex flex-col gap-3 w-full">
                <motion.h3
                  custom={0}
                  variants={childVariants}
                  animate={fundHovered ? "hover" : "initial"}
                  className="text-lg font-semibold text-white ml-11 pt-1.5"
                >
                  
                  Add Funds
                </motion.h3>

                <motion.p
                  custom={1}
                  variants={childVariants}
                  animate={fundHovered ? "hover" : "initial"}
                  className="text-sm text-gray-600 "
                >
                  Easily top up your wallet to stay ready for new subscriptions.
                </motion.p>

                <motion.div
                  custom={2}
                  variants={childVariants}
                  animate={fundHovered ? "hover" : "initial"}
                >
                  <span className="text-gray-500 text-sm">
                    Current Balance:
                  </span>
                  <div className="text-xl font-bold text-green-600">₹500</div>
                </motion.div>

                <motion.button
                  custom={3}
                  variants={childVariants}
                  animate={fundHovered ? "hover" : "initial"}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Add Funds
                </motion.button>
              </div>
            </motion.div>
            {/* Right text */}
            <div className='w-full h-full flex flex-col items-start justify-between'>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Raise investments and discover the joy they bring
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Keep track of your contributions with ease and transparency
              </p>
              <DraggableToggleButton label={"Add Funds"} />
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-12 items-center w-[80%] ml-[10rem]">
            <div
              onMouseEnter={() => setLocationHovered(true)}
              onMouseLeave={() => setLocationHovered(false)}
              className="flex text-white rounded-2xl p-6 w-full items-center mr-[5rem] shadow-xl "
            >
              {/* Left: Text Section */}
              <div className="flex-1 pr-6 flex flex-col gap-6 mr-[5rem]">
                <h3 className="text-3xl font-bold mb-2">
                  Participate in Events
                </h3>
                <p className="text-lg text-gray-300 mb-4">
                  Join engaging events that connect you with like-minded
                  individuals and meaningful causes
                </p>
                <button className="bg-[#6A5AE0] hover:bg-[#5849c9] text-white px-4 py-2 rounded-full text-lg font-medium w-fit">
                  Join us now !
                </button>
              </div>

              {/* Right: Map and Funding Button */}
              <div className="flex flex-col items-center justify-center gap-4 bg-[#b3e5fc] rounded-xl p-4 w-[17rem] h-[15rem] ">
                <motion.img
                  src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                  alt="Map"
                  className="w-full h-28 object-contain rounded-md"
                  animate={
                    locationHovered
                      ? { scale: 1.1, rotate: 2 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />

                <button className="bg-[#121212] hover:bg-[#1e1e1e] text-white flex items-center gap-2 px-3 py-2 rounded-xl mt-4 text-sm">
                  <FaHandHoldingUsd className="text-blue-400" />
                  Fund this Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Subscriber
