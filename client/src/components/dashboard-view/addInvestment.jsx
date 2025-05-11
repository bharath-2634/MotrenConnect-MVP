import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import PaymentPopUp from "../event-view/paymentPopUp";

const AddInvestment = () => {
  const [adding, setAdding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (adding) {
      setIsOpen(true);
    }
  }, [adding]);

  return (
    <div>
      <div className="rounded-2xl bg-zinc-800/60 backdrop-blur-md p-6 text-center text-zinc-100 flex flex-col items-center font-poppins">
        <h3 className="text-[1rem] font-medium">
          Turn your investment into a better tomorrow
        </h3>
        <p className="text-sm text-indigo-400 mt-1">With Motren</p>

        <button
          role="switch"
          aria-checked={adding}
          onClick={() => setAdding(!adding)}
          className="relative mt-6 w-72 h-14 rounded-full transition-colors duration-300
                     flex items-center justify-center font-medium text-lg focus:outline-none"
          style={{ backgroundColor: !adding ? "#4f46e5" : "#ffffff" }}
        >
          {!adding ? <p>Add Funds</p> : <p>Processing...</p>}
          {/* sliding knob */}
          <span
            className={`absolute left-3 top-1/2 -translate-y-1/2
                        flex items-center justify-center h-9 w-9 rounded-full bg-zinc-100 text-zinc-900
                        transition-transform duration-300
                        ${adding ? "translate-x-[230px]" : ""}`}
          >
            <Plus size={20} />
          </span>
        </button>

        <PaymentPopUp isOpen={isOpen} onClose={() => {
          setIsOpen(false);
          setAdding(false); // optional: reset toggle
        }} />

        <p className="text-sm text-indigo-400 mt-4">
          Contribute funds for a positive change
        </p>
      </div>
    </div>
  );
};

export default AddInvestment;
