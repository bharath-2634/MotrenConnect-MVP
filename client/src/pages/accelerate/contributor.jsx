import { useState } from "react";
import DraggableToggle from "../../components/accelerate-view/dragBtn";
import { AnimatePresence } from "framer-motion";
import crown from "../../assets/envelop_gif.gif"
import {
  FaCode,
  FaDiscord,
  FaGift,
  FaHandHoldingUsd,
  FaMoneyBillAlt,
  FaPhone,
  FaPlus,
  FaRocket,
  FaUsers,
} from "react-icons/fa";
import DraggableToggleButton from "../../components/accelerate-view/dragBtn";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { submitDeveloper } from "@/store/dev-slice";
import { toast } from "react-toastify";
import DeveloperForm from "@/components/accelerate-view/developerForm";
import { updateUserProfile } from "@/store/auth-slice";
import { submitContributor } from "@/store/con-slice";


const Contributor = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [isCrownHover,setCrownHover] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [profileHovered, setProfileHovered] = useState(false);
  const [fundHovered, setFundHovered] = useState(false);
  const [locationHovered, setLocationHovered] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth);

  const handleFormSubmit = () => {
    console.log("Raw form data:", user);
  
    if (user && user?.role!=="contributor") {
      const updatedUser = { ...user, role: "contributor" };
      // console.log(updatedUser);
      dispatch(updateUserProfile(updatedUser))
        .then(() => console.log("Success"))
        .catch((error) => console.log(error));
      
      dispatch(submitContributor({userId : user._id})).then(()=>console.log("Contributor Schema created and updated")).catch((error)=>console.log(error))
      toast.success("Congradulations ! you're on Contributor mode start contributing");
      setFormOpen(false);
    }else {
      toast.success("You're Already in Contributor mode!!");
      setFormOpen(false);
    }
  };


  const devCards = [
    {
      icon: <FaUsers className="text-indigo-400" />,
      text: "Join contributor-forum",
    },
    {
      icon: <FaCode />,
      text: "Referre Developer's and Client",
    },
    {
      icon: <FaRocket className="text-yellow-400" />,
      text: "Launch to Community",
    },
    {
      icon: <FaMoneyBillAlt className="text-green-400" />,
      text: "Earn Rewards",
    },
  ];

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
      top: `${index * 60}px`,
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

  return (
    <div className="w-full mt-10 flex flex-col items-center justify-center p-6 font-poppins">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-[2.5rem] font-medium text-white">Contributor's Forum</h1>
        <p className="text-[1.2rem] font-semibold text-[#ccc] mt-2">
          Join Motren's Contributor-forum , Contribute by referring - Make Impact - Earn Rewards
        </p>
      </div>
      {/* developer - 1 */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mt-[6rem]">
        {/* Left */}
        <div
          className="bg-[#cbeaff] p-6 rounded-xl w-fit mx-auto relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-[260px] h-[240px] flex items-center justify-center">
            {devCards.map((card, index) => (
              <motion.div
                key={index}
                className="absolute bg-[#1a1a1a] text-white px-3 py-3 rounded shadow flex items-center gap-3 w-[17rem]"
                custom={index}
                initial="initial"
                animate={isHovered ? "hovered" : "initial"}
                variants={cardVariants}
                style={{ zIndex: devCards.length - index }}
              >
                {card.icon}
                <span className="text-sm font-medium">{card.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <h2 className="text-[2rem] font-bold mb-4 text-white">
            Bring your ideas to life — <br />
            Build. Launch. Earn.
          </h2>

          <p className="text-gray-300 mb-3">
            Have a project in mind? Submit it to Motren, collaborate with
            developers, and turn your vision into reality.
          </p>

          <p className="text-gray-300 mb-6">
            Get rewarded for your contributions and create a{" "}
            <span className="text-blue-400 font-medium">real-world impact</span>
            .
          </p>

          {/* 👇 Draggable toggle button */}
          <button
            onClick={() => setFormOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Join now
          </button>
          {formOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 rounded-lg font-poppins">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Confirm your action</h3>
                <div className="flex flex-col items-start gap-2 mb-4">
                  <p className="text-[1rem]">Join Motren's Contributor Forum Where you will, <br /> <span className="text-blue-600">Collborate people <br />refere people and developer <br />earn rewards - Make Impact</span> </p>
                  <div className="flex items-center justify-center gap-3">
                    <input
                      type="checkbox"
                      id="confirm"
                      checked={confirmed}
                      onChange={() => setConfirmed(!confirmed)}
                      className="mt-1"
                    />
                    <label htmlFor="confirm" className="text-gray-700 text-[.6rem] mt-2">
                      by this I confirm I want to join and collaborate on Motren by following all the guidelines 
                    </label>
                  </div>
                  
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setFormOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!confirmed}
                    onClick={() => {
                      // Your join logic here
                      handleFormSubmit()
                      // alert("Joined successfully!");
                    }}
                    className={`px-4 py-2 rounded text-white ${
                      confirmed ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"
                    }`}
                  >
                    Confirm & Join
                  </button>
                </div>
              </div>
            </div>
          )}

          

        </div>
      </div>
      {/* developer - 2 */}

      <div className="max-w-[90%] mx-auto grid md:grid-cols-2 justify-between items-center gap-36 mt-20 ml-[10rem]">

        <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
          Add your story and inspire others
        </h2>
        <p className="text-gray-300 mb-6 text-lg">
          Share your journey with the community and create a lasting impact.
          Your story could motivate someone to start their own!
        </p>
        <DraggableToggleButton label={"Add your Story"} />
      </div>

      <motion.div
          className="relative bg-[#8edbff] rounded-2xl shadow-xl w-[300px] h-[280px] overflow-hidden flex items-center justify-center p-6"
          variants={containerVariants}
          initial="initial"
          animate={isCrownHover ? "hover" : "initial"}
          onMouseEnter={() => setCrownHover(true)}
          onMouseLeave={() => setCrownHover(false)}
        >
          {/* Animated Icon */}
          <motion.div
            initial={{ x: 0, y: 0 }}
            animate={isCrownHover ? { x: -110, y: -60 } : { x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className={`absolute rounded-full ${isCrownHover?"bg-blue-600 shadow-lg w-12":"bg-transparent"}  h-12 flex items-center justify-center cursor-pointer`}
          >
            <img src={crown} alt="" />
          </motion.div>

          {/* Content */}
          <div className="flex flex-col gap-3 w-full">
            {/* Headline */}
            <motion.div
              custom={0}
              variants={childVariants}
              animate={isCrownHover ? "hover" : "initial"}
              className="text-white text-lg font-semibold ml-12"
            >
              Submit Your Project
            </motion.div>

            {/* Description */}
            <motion.p
              custom={1}
              variants={childVariants}
              animate={isCrownHover ? "hover" : "initial"}
              className="text-sm text-black mt-1"
            >
              Bring your idea to life with code. Submit your work and get
              rewarded for building real solutions.
            </motion.p>

            {/* Button */}
            <motion.button
              custom={2}
              variants={childVariants}
              animate={isCrownHover ? "hover" : "initial"}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Start Building
            </motion.button>
          </div>
        </motion.div>
      </div>
      <section className=" text-white py-20 px-6 mt-10">
              <div className="max-w-6xl mx-auto space-y-20">
                {/* Section 1: Add your story */}
                <div className="grid md:grid-cols-2 gap-12 items-center justify-start mr-20">
                <motion.div
                    className="relative bg-[#8edbff] rounded-2xl shadow-xl w-[300px] min-h-[220px] overflow-hidden flex items-center justify-center p-6 ml-[7rem]"
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
                 
                </div>
      
                {/* Section 2: Add Funds */}
                <div className="grid md:grid-cols-2 gap-0 items-center  px-10 mt-[0rem]">
                  <div className='w-full h-full flex flex-col items-start justify-between ml-[6rem] mt-[0rem]'>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                      Raise investments and discover the joy they bring
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">
                      Keep track of your contributions with ease and transparency
                    </p>
                    <DraggableToggleButton label={"Add Funds"} />
                  </div>
                  {/* Left card */}
                  <motion.div
                    className="relative bg-[#8edbff] rounded-2xl shadow-xl w-[300px] min-h-[220px] overflow-hidden flex items-center justify-center p-6 ml-[8rem] "
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
                  
                </div>
      
                <div className="grid md:grid-cols-1 gap-12 items-center w-[80%] ml-[10rem]">
                  <div
                    onMouseEnter={() => setLocationHovered(true)}
                    onMouseLeave={() => setLocationHovered(false)}
                    className="flex  text-white rounded-2xl p-6 w-full items-center mr-[5rem] shadow-xl gap-[2rem]"
                  >
                    {/* Left: Text Section */}
                    <div className="flex flex-col items-center justify-center gap-4 bg-[#b3e5fc] rounded-xl p-4 w-[17rem] h-[15rem] -ml-9">
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

                    {/* Right side */}
                    <div className="flex-1 pr-6 flex flex-col gap-6 ml-6">
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
                    
                  </div>
                </div>
              </div>
            </section>

    </div>
  )
}

export default Contributor;
