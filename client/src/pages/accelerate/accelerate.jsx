import DeveloperForm from '@/components/accelerate-view/developerForm';
import AccelerateHeader from '@/components/accelerate-view/header';
import { submitDeveloper } from '@/store/dev-slice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// AccelerateHeader

const Accelerate = () => {

  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth);

  const handleFormSubmit = (data) => {
    console.log("Raw form data:", data);
  
    if (user) {
      const transformedData = {
        userId: user._id,
        domain: data.domains,
        techStack: data.techStack,
        repoLink: [ 
          data.repo1,
          data.repo2,
        ],
      };
  
      console.log("Transformed data:", transformedData);
      dispatch(submitDeveloper(transformedData))
        .then(() => console.log("Success"))
        .catch((error) => console.log(error));
    }
  };
  
  

  return (
    <div>
      {/* <div className='w-full  overflow-hidden'>
        <AccelerateHeader/>
      </div> */}
      <button
        onClick={() => setFormOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Developer Form
      </button>

      <DeveloperForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}

export default Accelerate;
