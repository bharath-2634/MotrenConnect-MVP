import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentPopUp = ({ isOpen, onClose, user, amount }) => {
  const [step, setStep] = useState("qr"); // qr | progress | thanks
  const [paymentLink, setPaymentLink] = useState(null);
  const [timer, setTimer] = useState(180); // 3 mins
  const [paymentId, setPaymentId] = useState(null);

  // Close on timeout
  useEffect(() => {
    let interval;
    if (step === "qr" && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }

    if (timer === 0 && step === "qr") {
      alert("Payment session expired. Please try again.");
      onClose("timeout");
    }

    return () => clearInterval(interval);
  }, [timer, step]);

  // Create Razorpay Payment Link
  useEffect(() => {
    if (!isOpen) return;

    const createLink = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/payment/create", {
          amount,
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
        });

        setPaymentLink(res.data.short_url);
        setPaymentId(res.data.id);
        setStep("qr");
        setTimer(180); // Reset timer
      } catch (err) {
        console.error("Error creating payment link", err);
        onClose("error");
      }
    };

    createLink();
  }, [isOpen]);

  // Poll Payment Status
  useEffect(() => {
    if (!paymentId || step !== "qr") return;

    const poll = setInterval(async () => {
      try {
        const res = await axios.get(`/api/payment/status/${paymentId}`);
        if (res.data.paid) {
          clearInterval(poll);
          setStep("progress");

          setTimeout(() => setStep("thanks"), 4000);
        }
      } catch (err) {
        console.error("Status check failed", err);
      }
    }, 10000); // every 10 seconds

    return () => clearInterval(poll);
  }, [paymentId, step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg text-center w-[90%] max-w-md relative">
        <button onClick={() => onClose("cancel")} className="absolute top-2 right-4 text-gray-600 hover:text-red-500">
          ✕
        </button>

        {step === "qr" && (
          <>
            <h2 className="text-xl font-semibold mb-3">Scan & Pay</h2>
            {paymentLink ? (
              <iframe
                src={paymentLink}
                title="Razorpay Payment"
                className="w-full h-72 rounded border"
              />
            ) : (
              <p>Generating QR code...</p>
            )}
            <p className="mt-2 text-sm text-gray-500">Time remaining: {timer}s</p>
          </>
        )}

        {step === "progress" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Verifying Payment...</h2>
            <div className="w-full mt-4">
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-500 animate-pulse rounded w-full"></div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-sm">Please wait a moment.</p>
          </>
        )}

        {step === "thanks" && (
          <>
            <h2 className="text-xl font-bold text-green-600 mb-2">Thank You! 🎉</h2>
            <p className="text-gray-700">
              Your contribution means a lot. We appreciate your kindness 💖
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => onClose("success")}
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
