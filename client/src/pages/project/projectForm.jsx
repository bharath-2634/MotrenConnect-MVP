import React, { useState } from 'react'
import "../../components/styles/style.css";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '@/store/project-slice';
import { MdCancel } from "react-icons/md";
import logo from "../../assets/logo.png";

const ProjectForm = () => {

  const {user} = useSelector((state)=>state.auth);
  console.log(user?._id);
  const [userId,setUserId] = useState(user?._id);
  const [afterSubmit,setAfterSubmit] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userId : userId,
    title: "",
    description: "",
    workFlow: "",
    techStack: "",
    submissionDate: "",
    maxBudget: "",
    isMentorshipProject: true,
  });
  const [document, setDocument] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let documentUrl = "";
  
      // Step 1: Upload document to Cloudinary
      if (document) {
        const docData = new FormData();
        docData.append("file", document);
        docData.append("upload_preset", "MotrenAI");
        docData.append("cloud_name", "dgpwhsnoh");
  
        const uploadRes = await fetch("https://api.cloudinary.com/v1_1/dgpwhsnoh/auto/upload", {
          method: "POST",
          body: docData
        });
  
        const uploadResult = await uploadRes.json();
        documentUrl = uploadResult.secure_url; 
      }
  
      // Step 2: Add document URL to formData
      const finalData = {
        userId : userId,
        ...formData,
        documentUrl: documentUrl, // Now it's just a string (URL)
      };
  
      console.log("FinalData",finalData);
      dispatch(createProject(finalData)).then(()=>console.log("Added !")).catch((error)=>console.log(error));
      setAfterSubmit(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };
  

  return (
    <div className='w-full project-bg flex flex-col items-center justify-center p-6 text-white font-poppins'>
      <span onClick={()=>{window.history.back()}} className='w-full ml-[10rem]'><IoChevronBack className='text-white font-poppins text-[1.6rem]'/></span>
      <div className='w-full flex items-center justify-center '>
        <form onSubmit={handleSubmit} className='w-[60%] flex flex-col items-center justify-center gap-3 bg-primary shadow-lg rounded backdrop-blur-sm p-3'>
          <h2 className='text-[1.3rem]'>Submit your Idea !</h2>
          <p>you're at right place to bring your project live</p>

          {/* Project Title */}
          <div className='w-[80%] flex flex-col items-start justify-start gap-2 mt-6'>
            <h2 className='text-[.9rem]'>Project Title</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder='Project Title (eg. Motren-Connect)'
              className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Project Description */}
          <div className='w-[80%] flex flex-col items-start justify-start gap-2 mt-6'>
            <h2 className='text-[.9rem]'>Project Description</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder='Project Description (eg. This project is to make a social-impact)'
              className="w-full p-2 h-24 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Workflow */}
          <div className='w-[80%] flex flex-col items-start justify-start gap-2 mt-4'>
            <h2 className='text-[.9rem]'>Project Workflow</h2>
            <textarea
              name="workFlow"
              value={formData.workFlow}
              onChange={handleChange}
              placeholder='Explain the workflow/approach'
              className="w-full p-2 h-20 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tech Stack */}
          <div className='w-[80%] flex flex-col items-start justify-start gap-2 mt-4'>
            <h2 className='text-[.9rem]'>Tech Stack</h2>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder='(eg. MERN, Firebase, TailwindCSS)'
              className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submission Date */}
          <div className='w-[80%] flex flex-col items-start justify-start gap-2 mt-4'>
            <h2 className='text-[.9rem]'>Submission Date</h2>
            <input
              type="date"
              name="submissionDate"
              value={formData.submissionDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Budget */}
          <div className='w-[80%] flex flex-col items-start justify-start gap-2 mt-4'>
            <h2 className='text-[.9rem]'>Max Budget</h2>
            <input
              type="number"
              name="maxBudget"
              value={formData.maxBudget}
              onChange={handleChange}
              placeholder='Enter max budget'
              className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mentorship Checkbox */}
          <div className='w-[80%] flex items-center justify-start gap-2 mt-4'>
            <input
              type="checkbox"
              name="isMentorshipProject"
              checked={formData.isMentorshipProject}
              onChange={handleChange}
            />
            <label className='text-[.9rem]'>Mentorship Project</label>
          </div>

          {/* Document Upload */}
          <div className='w-[80%] flex flex-col items-start justify-start gap-2 mt-4'>
            <h2 className='text-[.9rem]'>Upload Document</h2>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full bg-zinc-700 text-white"
            />
          </div>

          {/* Submit Button */}
          <div className='w-[80%] mt-6'>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-2 px-4 rounded">
              Submit Project
            </button>
          </div>
        </form>

      </div>

      {
        afterSubmit && (
          <div className='backdrop-blur-0 w-[50%] bg-black rounded h-[20rem] absolute top-20 flex flex-col items-center justify-center gap-4'>
              <div className='w-full text-end flex items-end justify-end mr-10'>
                <MdCancel onClick={()=>setAfterSubmit(false)} className='text-[1.5rem] text-end'/>
              </div>
              <img src={logo} alt="MotrenConnect" className='w-[5rem] h-[3rem]'/>
              <p className='w-full p-8 text-center'>You're Project has been submitted and on waiting list we'll get back to you within 30 mins</p>
              <button className='bg-primary_button py-4 px-6 rounded mb-5' onClick={()=>window.history.back()}>Continue</button>
          </div>
        )
      }
      
    </div>
  );
};

export default ProjectForm;
