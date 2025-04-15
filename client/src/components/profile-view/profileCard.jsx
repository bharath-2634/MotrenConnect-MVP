import { logoutUser, updateUserProfile } from '@/store/auth-slice';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCloudUploadAlt } from "react-icons/fa";
import userImg from "../../assets/userImg.png";
import axios from 'axios';

const CLOUD_NAME = "dgpwhsnoh";
const UPLOAD_PRESET = "MotrenAI";

const ProfileCard = () => {
  const dispatch = useDispatch();
  const { user,isAuthenticated,isLoading } = useSelector((state) => state.auth);

  console.log("userProfile",user);

  const [previewImg, setPreviewImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const imageUrl = await res.data.secure_url;
      setPreviewImg(imageUrl);
      console.log("ImageUrl",imageUrl);

      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          avatar_url: imageUrl,
        }
      };

      console.log("UpdatedUser",updatedUser);
      dispatch(updateUserProfile(updatedUser));
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  return (
    <div className='w-full flex items-center justify-between gap-3 p-3 font-poppins'>
      <div className='p-8 flex gap-3 items-center capitalize'>
        <div
          className='relative group cursor-pointer border-2 border-primary_button rounded-full w-[5rem] h-[5rem] overflow-hidden'
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={previewImg || user?.profile?.avatar_url || userImg}
            alt="Profile"
            className='w-full h-full object-cover rounded-full'
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 hidden group-hover:flex items-center justify-center">
            <FaCloudUploadAlt className='text-white' />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <h2 className='text-[1.2rem] text-primary_button font-medium'>{user?.userName || "Nan"}</h2>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-yellow-400 rounded-full'></div>
            <p className='text-white text-[.8rem]'>{user?.role || "Nan"}</p>
          </div>
        </div>
      </div>
      <div className='p-8'>
        <div
          className='w-[7rem] p-2 text-white bg-primary_button rounded text-center cursor-pointer'
          onClick={handleLogout}
        >
          <h2 className='text-[1.1rem] capitalize'>logout</h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
