import React from "react";
import BottomNav from "../common/header";
import "../styles/style.css";
import bg_video from "../../assets/auth-bg.mp4";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-auto">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video 
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay 
          muted 
          loop
        >
          <source src={bg_video} type="video/mp4" />
        </video>
        {/* Overlay to make text visible */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-white w-full overflow-auto">
        {/* <BottomNav /> */}
        <div className="w-full overflow-auto">
            <Outlet/>
        </div>
        
      </div>
    </div>
  );
};

export default AuthLayout;
