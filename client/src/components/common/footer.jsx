import { Mail, Copy, ArrowRight } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

  return (
    <footer className="bg-[#000] text-white py-16 px-8 md:px-24">
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        {/* Contact Section */}
        <div>
          <p className="text-sm text-gray-400 uppercase mb-2">Contact Us</p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6">
            Let’s Discuss Your <br /> Vision. With Us
          </h2>
          <button className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-medium hover:bg-gray-200 transition">
            Schedule a call now <ArrowRight size={18} />
          </button>

          <p className="text-sm text-gray-400 uppercase mt-8 mb-2">Or email us at</p>
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center justify-between w-max space-x-3">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span className="text-sm">bharath2005goo@gmail.com</span>
            </div>
            <Copy size={14} className="cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-sm">
          <p className="text-gray-400 uppercase mb-2">Quick Links</p>
          <ul className="space-y-2 text-white">
            <li onClick={()=>navigate("/main/home")} className='cursor-pointer'>Home</li>
            <li onClick={()=>navigate("/main/event")} className='cursor-pointer'>Events</li>
            <li onClick={()=>navigate("/main/accelerate")} className='cursor-pointer'>Accelerate</li>
            <li onClick={()=>navigate("/profile/profile/basic")} className='cursor-pointer'>Profile</li>
            <li onClick={()=>navigate("/main/dashboard")} className='cursor-pointer'>Dashboard</li>
          </ul>
        </div>

        {/* Information */}
        <div className="text-sm">
          <p className="text-gray-400 uppercase mb-2">Information</p>
          <ul className="space-y-2 text-white">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookies Settings</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-xs text-gray-500">&copy;2025. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-4 mt-4 md:mt-0 text-white">
          <FaFacebookF className="cursor-pointer hover:text-gray-400" />
          <FaTwitter className="cursor-pointer hover:text-gray-400" />
          <FaInstagram className="cursor-pointer hover:text-gray-400" />
          <FaLinkedinIn className="cursor-pointer hover:text-gray-400" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
