import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import qrCode from "../../assets/qr-code.jpg";

const PaymentPopUp = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("qr"); // 'qr' → 'progress' → 'thanks'
  const close = () =>{
    console.log(onClose("thanks"));
  }
  // close()
  useEffect(() => {
    if (isOpen) {
      setStep("qr"); // reset when popup opens
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === "qr") {
      const qrTimer = setTimeout(() => setStep("progress"), 6000); // show progress after 6s
      return () => clearTimeout(qrTimer);
    }

    if (step === "progress") {
      const progressTimer = setTimeout(() => setStep("thanks"), 6000); // show thanks after 5s
      return () => clearTimeout(progressTimer);
    }

    // console.log("setP",step);
  
  }, [step]);

  if (!isOpen) return null;

//   const { user, isAuthenticated, isLoading }  = useSelector((state)=>state.auth);
//   console.log("userPayment",user);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg text-center w-[90%] max-w-md relative">
        <button onClick={()=>onClose("no")} className="absolute top-2 right-4 text-gray-600 hover:text-red-500">
          ✕
        </button>

        {step === "qr" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Scan to Donate</h2>
            <img src={qrCode} alt="QR Code" className="mx-auto w-48 h-48 mb-4" />
            <p className="text-sm text-gray-600">Use GPay or any UPI app to send the donation.</p>
          </>
        )}

        {step === "progress" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Processing Payment...</h2>
            <div className="w-full mt-4">
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-500 animate-pulse rounded w-full"></div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-sm">Verifying your donation...</p>
          </>
        )}

        {step === "thanks" && (
          <>
            <h2 className="text-xl font-bold text-green-600 mb-2">Thank You! 🎉</h2>
            <p className="text-gray-700">
              Your contribution makes a big difference. We appreciate your kindness 💖
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={()=>close()}  // Pass the current step back
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPopUp;
