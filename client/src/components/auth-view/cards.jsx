import React from "react";
import Tilt from "react-parallax-tilt";

const GlassCard = ({ title, description ,icon }) => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.4}
      glareColor="#00FFFF"
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      className="relative backdrop-blur-md bg-black/15 
                 p-3 m-2 rounded shadow-lg hover:shadow-cyan-500/50 transition-all 
                 duration-300 w-[80%] text-white font-poppins"
    >

      <div className="flex flex-row items-center gap-2">
        <div className="text-yellow-400 text-[.8rem]">{icon}</div>
        <h5 className="text-base font-bold">{title}</h5>
      </div>
      <p className="text-gray-300 text-sm">{description}</p>
    </Tilt>
  );
};

export default GlassCard;