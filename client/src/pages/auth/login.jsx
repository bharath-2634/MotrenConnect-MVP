import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from 'react-router-dom';
import user_img from "../../assets/User_img.png";
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import GoogleLoginButton from '@/components/common/googleBtn';
import { toast } from "react-toastify"; 

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [openEye, setOpenEye] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{

      if(data?.payload?.success) {
        toast.success(data?.payload?.message || "Login successful!", {
          style: { backgroundColor: "black", color: "white" }, 
        });
      }else {
        toast.error(data?.payload?.message || "Login failed!");
      }
    })
  }



  return (
    <div className='mx-auto lg:w-[60%] md:w-[50%] sm:w-[60%] w-[100%] max-w-md space-y-6 text-center flex flex-col items-center justify-center font-poppins overflow-auto'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h2 className='text-sm text-gray-400 lg:mt-10 md:mt-10 sm:mt-10 mt-10'>
          Join over <span className='text-white font-bold ml-1 mr-1'>2M</span> global social users
        </h2>
        <img src={user_img} alt="Motren-connect" className='w-[4rem]' />
      </div>
      <div className='bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 w-[90%] max-w-md flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-3'>
          <div className='bg-white/10 backdrop-blur-lg shadow-lg rounded-[6.4rem] py-[.8rem] px-2 w-[3rem] max-w-md'>
            <img src={logo} alt="Motren" className='w-[2.2rem] h-full' />
          </div>
          <h2 className='font-medium lg:text-[1.2rem] md:text-[1rem] sm:text-[1rem] text-[1rem]'>Motren Connect</h2>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 mt-5 w-full'>
          {/* Email Input */}
          <input 
            type="text" 
            name="email"
            value={formData.email} 
            onChange={handleChange}
            className='bg-white/10 backdrop-blur-lg shadow-lg lg:w-[80%] md:w-[90%] sm:w-[95%] w-[100%] lg:p-3 md:p-3 sm:p-3 p-3 rounded-[.3rem] outline-none border-none font-poppins font-light lg:text-[1rem] md:text-[1rem] sm:text-[1rem] text-[.8rem]' 
            placeholder='UserName/Email' 
          />

          {/* Password Input */}
          <div className='relative w-full'>
            <input 
              type={openEye ? "text" : "password"} 
              name="password"
              value={formData.password} 
              onChange={handleChange}
              className='bg-white/10 backdrop-blur-lg shadow-lg lg:w-[80%] md:w-[90%] sm:w-[95%] w-[100%] lg:p-3 md:p-3 sm:p-3 p-3 rounded-[.3rem] outline-none border-none font-poppins font-light lg:text-[1rem] md:text-[1rem] sm:text-[1rem] text-[.8rem]' 
              placeholder='Password' 
            />
            <div className='absolute top-4 lg:right-12 md:right-12 sm:right-11 right-5 text-gray-400'>
              {openEye ? 
                <span onClick={() => setOpenEye(false)}><IoIosEye /></span> : 
                <span onClick={() => setOpenEye(true)}><IoIosEyeOff /></span>
              }
            </div>
          </div>

          <div className='w-[100%] mt-3 flex flex-col items-center justify-center gap-2'>
            <button className='bg-primary_button lg:p-[.6rem] ms:p-[.5rem] sm:p-[.5rem] p-[.5rem] rounded-[.5rem] lg:w-[80%] md:w-[85%] sm:[80%] w-[90%] lg:text-[1rem] md:text-[1rem] sm:text-[1rem] text-[1rem]' onClick={(e)=>{handleSubmit(e)}}>Sign in</button>
            {/* OAuth Google Authentication */}
            {/* <button className='bg-primary_button g:p-[.6rem] ms:p-[.5rem] sm:p-[.5rem] p-[.5rem] rounded-[.5rem] lg:w-[80%] md:w-[85%] sm:[80%] w-[90%] lg:text-[1rem] md:text-[1rem] sm:text-[1rem] text-[1rem]'>Google</button> */}
            <div className='lg:w-[80%] md:w-[85%] sm:[80%] w-[90%]'>
              <GoogleLoginButton/>
            </div>
            
            
          </div>

          <h2 className='text-gray-400 text-sm'>
            Don't have an account? 
            <Link className='text-primary_button' to="/auth/register"> Sign up</Link>. It's free!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
