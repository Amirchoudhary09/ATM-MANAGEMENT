import React, { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import ATMCard from "./ATMCard";
import axios from "axios"
export default function VisaATMForm() {
  const [formData, setFormData] = useState({
    cardholder: "",
    cardnumber: "",
    expiry: "",
    cvv: "",
    bankname: "PNB",
    phonenumber: "",
    email: ""
  });

  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Card Number: digits only, max 16 digits
    if (name === "cardnumber") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
      setFormData({ ...formData, cardnumber: digitsOnly });
    }
    // CVV: digits only, max 3 digits
    else if (name === "cvv") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 3);
      setFormData({ ...formData, cvv: digitsOnly });
    }
    else if (name === "phonenumber") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData,phonenumber: digitsOnly });
    }
    // Others
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();

  axios.post("http://localhost:3000/api/webside/enquiry/insert", {
    cardholder: formData.cardholder,
    cardnumber: formData.cardnumber,
    expiry: formData.expiry,
    cvv: formData.cvv,
    bankname: formData.bankname,
    phonenumber: formData.phonenumber, // Placeholder, replace with actual data
    email: formData.email
  })
  .then((res) => {
    console.log("Enquiry saved successfully:", res.data);
    alert("Enquiry saved successfully!");
  })
  .catch((err) => {
    console.error("Error saving enquiry:", err.response?.data || err.message);
    alert("Failed to save enquiry");
  });
};

  

  return (
    <div className="grid lg:grid-cols-2 gap-6 p-6">
      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          Visa / ATM Details
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="cardholder" value="Cardholder Name" />
            <TextInput
              id="cardholder"
              name="cardholder"
              placeholder="John Doe"
              value={formData.cardholder}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="cardnumber" value="Card Number" />
            <TextInput
              id="cardnumber"
              name="cardnumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardnumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="expiry" value="Expiry Date" />
            <TextInput
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="cvv" value="CVV" />
            <TextInput
              id="cvv"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onFocus={() => setIsCvvFocused(true)}
              onBlur={() => setIsCvvFocused(false)}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Focus to flip card and fill CVV
            </p>
          </div>

          <div>
            <Label htmlFor="bankname" value="Bank Name" />
            <TextInput
              id="bankname"
              name="bankname"
              placeholder="PNB"
              value={formData.bankname}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="phonenumber" value="phone number" />
            <TextInput
              id="phonenumber"
              name="phonenumber"
              placeholder="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="email" value="email" />
            <TextInput
              id="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>

      {/* ATM Card Preview */}
      <div className="flex justify-center items-center">
        <ATMCard
          data={formData}
          isCvvFocused={isCvvFocused}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
