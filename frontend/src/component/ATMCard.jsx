import React, { useEffect, useState } from "react";

export default function ATMCard({ data, isCvvFocused, setFormData }) {
  const {
    cardholder = "FULL NAME",
    cardnumber = "0000 0000 0000 0000",
    expiry = "MM/YY",
    cvv = "",
    bankname = "PNB",
  } = data || {};

  const [displayNumber, setDisplayNumber] = useState("0000 0000 0000 0000");
  const [localCvv, setLocalCvv] = useState(cvv);

  useEffect(() => {
    setLocalCvv(cvv); // sync parent CVV changes
  }, [cvv]);

  // Animate 16-digit card number
  useEffect(() => {
    let i = 0;
    let formatted = "";
    const interval = setInterval(() => {
      if (i < Math.min(16, cardnumber.length)) {
        formatted += cardnumber[i];
        let spaced = formatted
          .padEnd(16, "0")
          .replace(/(.{4})/g, "$1 ")
          .trim();
        setDisplayNumber(spaced);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [cardnumber]);

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3); // max 3 digits
    setLocalCvv(value); // local state
    setFormData((prev) => ({ ...prev, cvv: value })); // sync parent
  };

  return (
    <div className="perspective w-80 h-48">
      <div
        className={`relative w-full h-full rounded-2xl shadow-2xl transform-gpu transition-transform duration-700 ${
          isCvvFocused ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        {!isCvvFocused && (
          <div className="absolute w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl">
            <div className="absolute top-4 right-4 font-bold">{bankname}</div>
            <div className="w-12 h-8 bg-gray-300 rounded-sm mt-6"></div>
            <div className="mt-6 text-xl tracking-widest">{displayNumber}</div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="text-xs block">Card Holder</span>
                <span className="font-semibold">{cardholder.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-xs block">Expires</span>
                <span className="font-semibold">{expiry}</span>
              </div>
            </div>
          </div>
        )}

        {/* Back Side with CVV */}
        {isCvvFocused && (
          <div className="absolute w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl flex flex-col justify-center items-center">
            <div className="bg-black h-10 w-full mb-6"></div>
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2">Enter CVV</span>
              <input
                type="text"
                maxLength={3}
                value={localCvv}
                onChange={handleCvvChange}
                className="bg-white text-black px-4 py-2 rounded w-20 text-center text-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
