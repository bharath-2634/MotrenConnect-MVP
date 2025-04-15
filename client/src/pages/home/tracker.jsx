import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Tracker = () => {
  const projectList = [
    {
      id: 0,
      title: 'Recommendation System',
      description:
        "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
      tag: 'AI',
      techStack: ['AI', 'ML', 'Python', 'React'],
      progress: 50,
      updatedOn: new Date().getDate(),
      developers: ['person1', 'person2', 'person3'],
      controller: {
        id: 0,
        name: 'Controller1',
        image: '',
      },
    },
    {
      id: 1,
      title: 'Recommendation System ||',
      description:
        "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
      tag: 'full-stack',
      techStack: ['AI', 'ML', 'Python', 'React'],
      progress: 50,
      updatedOn: new Date().getDate(),
      developers: ['person1', 'person2', 'person3'],
      controller: {
        id: 1,
        name: 'Controller2',
        image: '',
      },
    },
    {
      id: 2,
      title: 'Recommendation System |||',
      description:
        "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
      tag: 'AI',
      techStack: ['AI', 'ML', 'Python', 'React'],
      progress: 50,
      updatedOn: new Date().getDate(),
      developers: ['person1', 'person2', 'person3'],
      controller: {
        id: 1,
        name: 'Controller2',
        image: '',
      },
    },
  ];

  const projectCardBg = [
    {
      id: 0,
      tag: 'AI',
      bg: 'linear-gradient(135deg, #FF6B6B, #FFE66D)', // Gradient for AI
    },
    {
      id: 1,
      tag: 'full-stack',
      bg: 'linear-gradient(135deg, #4ECDC4, #556270)', // Gradient for full-stack
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectList.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectList.length) % projectList.length);
  };

  // Function to find the background gradient based on the tag
  const getBackgroundColor = (tag) => {
    const bgConfig = projectCardBg.find((item) => item.tag === tag);
    return bgConfig ? bgConfig.bg : 'white'; // Default to white if no match is found
  };

  return (
    <div className="flex items-center justify-between gap-3 w-full p-5">
      <div className="relative w-[40%] max-w-3xl mx-auto flex items-center justify-center ml-3">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-[-15px] bg-gray-700 p-3 rounded-full hover:bg-gray-500 transition-all z-10"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Wrapper */}
        <div className="relative w-[80%] h-[20rem] md:h-[20rem] overflow-hidden rounded-[.6rem] flex justify-center items-center text-gray-900 p-6 shadow-lg">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: direction * 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 300, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                if (info.offset.x > 100) prevSlide();
                if (info.offset.x < -100) nextSlide();
              }}
              className="absolute w-full h-full flex flex-col justify-center items-center cursor-grab active:cursor-grabbing"
              style={{
                background: getBackgroundColor(projectList[currentIndex].tag),
              }}
            >
              {/* Card Content */}
              <div className="w-full h-full flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold">{projectList[currentIndex].title}</h2>
                <p className="mt-2 text-gray-500">{projectList[currentIndex].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-[-10px] bg-gray-700 p-3 rounded-full hover:bg-gray-500 transition-all z-10"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Empty Space */}
      <div className="w-[50%]"></div>
    </div>
  );
};

export default Tracker;