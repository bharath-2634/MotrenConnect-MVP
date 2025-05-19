import React, { useState } from 'react';
import {
  Info,
  Coins,
  LineChart,
  Mail,
  Settings,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
    { name: "Basic Info", icon: <Info size={20} />, to: "basic" },
    { name: "Points Activity", icon: <Coins size={20} />, to: "points" },
    { name: "Fund Grade", icon: <LineChart size={20} />, to: "fund" },
    { name: "Envelop Activity", icon: <Mail size={20} />, to: "envelop" },
    { name: "Account", icon: <Settings size={20} />, to: "account" },
    { name: "Orders", icon: <Send size={20} />, to: "orders" },
  ];

const ProfileMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate()

  const handleclick = (index,to)=>{
    setActiveIndex(index);
    navigate(`${to}`)
  }

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl w-60 text-white space-y-4 whitespace-nowrap">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => {handleclick(index,item.to)}}
          className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition hover:bg-[#2A2A2A] ${
            activeIndex === index ? 'border-l-4 border-blue-500 bg-[#2A2A2A]' : ''
          }`}
        >
          {item.icon}
          <span className="text-sm font-medium">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ProfileMenu;
