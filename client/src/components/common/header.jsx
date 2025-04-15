import { useState , useRef } from "react";
import { FaHome, FaSearch, FaChartPie, FaClock, FaUser, FaArrowLeft } from "react-icons/fa";
import { MdCancel , MdEvent , MdRocketLaunch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [active, setActive] = useState("/main/home");
  const [searchMode, setSearchMode] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: <FaHome />, id: "/main/home" },
    { name: "Event", icon: <MdEvent />, id: "event" },
    { name: "Accelerate", icon: <MdRocketLaunch />, id: "/main/accelerate" },
    { name: "Search", icon: <FaSearch/>, id: "search" },
    { name: "Dashboard", icon: <FaUser />, id: "profile" },
  ];
  const handleSearchClick = () => {
    setSearchMode(true);
    setTimeout(() => inputRef.current?.focus(), 200); 
  };

  const exitSearchMode = () => {
    setSearchMode(false);
    setActive("home"); 
  };

  const handleNavigate = (id) => {
    navigate(id);
  }

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 lg:w-[25rem] md:w-[24rem] sm:w-[18rem] w-[17rem] bg-primary_box 
    flex flex-col justify-between items-center px-6 lg:py-2 md:py-[.4rem] sm:py-[.3rem] py-[.4rem] rounded-[2rem] shadow-lg z-20">
      <div className="flex items-center justify-between">
      {searchMode ? (
        <div className="flex items-center w-full gap-2 relative">
          <button
            className="text-white text-xl absolute right-1 top-2"
            onClick={exitSearchMode}
          >
            <MdCancel />
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="lg:w-[20rem] md:w-[18rem] sm:w-[16rem] w-[16rem] px-3 lg:py-3  md:py-2 sm:py-2 py-2 bg-primary text-white outline-none rounded-[2rem]"
          />
        </div>
      ) : ( navItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-full  transition-all duration-300 ${
              active === item.id ? "bg-[#6C49E0] text-white" : "text-gray-400"
            }`}
            onClick={() => (item.id === "search" ? handleSearchClick() : handleNavigate(item.id))}
          >
            <span className="text-xl">{item.icon}</span>
            <span
              className={`hidden md:block transition-opacity duration-300 ${
                active === item.id ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              {item.name}
            </span>
          </button>
        )) )
      }
      </div>
    </div>
  );
};

export default BottomNav;
