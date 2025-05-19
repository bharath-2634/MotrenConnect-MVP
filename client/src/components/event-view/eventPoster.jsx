import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-xl">
      {/* Main Image */}
      <div className="relative w-[80%] max-w-[700px] h-[200px] mb-4 overflow-hidden rounded-xl">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover rounded-xl transition-all duration-300"
        />
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setCurrentIndex(index)}
            className={clsx(
              "w-14 h-20 object-cover rounded cursor-pointer border-2 transition-all duration-200",
              currentIndex === index
                ? "border-white scale-105"
                : "border-transparent opacity-70"
            )}
            alt={`Thumb ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
