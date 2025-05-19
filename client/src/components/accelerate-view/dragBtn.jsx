import { useState, useRef } from 'react';
import { FaPlus } from "react-icons/fa6";

export default function DraggableToggleButton({ label}) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  const maxDrag = 24; // max distance the toggle can slide

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const startX = e.clientX;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newX = Math.max(0, Math.min(maxDrag, deltaX));
      setDragX(newX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <button className="bg-[#1f1f1f] w-fit text-white font-semibold px-5 py-2 rounded-full flex items-center gap-2 shadow-inner border border-[#2b2b2b]">
      {label}
      <div className='w-11 rounded-full bg-black'>
      <div
        ref={dragRef}
        onMouseDown={handleMouseDown}
        className="w-6 h-6 bg-blue-400 rounded-full cursor-pointer relative transition-all duration-300 flex items-center justify-center text-gray-900"
        style={{ transform: `translateX(${dragX}px)` }}
      >
        <FaPlus/>
      </div>
      </div>
    </button>
  );
}