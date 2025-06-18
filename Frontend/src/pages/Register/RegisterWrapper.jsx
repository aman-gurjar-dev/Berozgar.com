import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const RegisterWrapper = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    bio: "",
    skills: "",
    location: {
      city: "",
      area: "",
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateForm = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {step === 1 && (
        <StepOne
          nextStep={nextStep}
          formData={formData}
          updateForm={updateForm}
        />
      )}
      {step === 2 && (
        <StepTwo
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          updateForm={updateForm}
        />
      )}
      {step === 3 && (
        <StepThree
          prevStep={prevStep}
          formData={formData}
          updateForm={updateForm}
        />
      )}
    </div>
  );
};

export default RegisterWrapper;
