import React, { useState } from "react";


const Faq = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    setSelected(selected === i ? null : i);
  };

  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur.",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur."
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur.",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur."
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur.",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur."
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur.",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur."
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur.",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, aspernatur."
    },
  ];

  const handleDownload = () => {

  }

  return (
    <section className="bg-[#111] text-white py-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-10 mt-5 w-full">
     
      {/* Right - FAQ Accordion */}
      <div className="w-full md:w-1/2 space-y-2 ">
        {faqs.map(({ question, answer }, index) => (
          <div 
            key={index} 
            className="bg-[#333] text-white rounded shadow-md cursor-pointer transition-all duration-300"
            onClick={() => toggle(index)}
          >
            {/* Question */}
            <div className="flex justify-between items-center bg-[#222] p-4 rounded-t">
              <h2 className="text-[1rem] font-normal">{question}</h2>
              <span className={`text-1xl transition-transform duration-300 ${selected === index ? "rotate-180" : ""}`}>
                {selected === index ? "−" : "+"}
              </span>
            </div>

            {/* Answer (Smooth Transition) */}
            <div 
              className={`bg-[#111] overflow-hidden transition-all duration-500 ease-in-out ${
                selected === index ? "max-h-40 opacity-100 py-2" : "max-h-0 opacity-0"
              }`}
            >
              <p className="bg-[#111] p-3 rounded-b text-gray-300 w-full">{answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
