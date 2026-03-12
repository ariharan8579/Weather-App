import React, { useState } from "react";

const Advice = () => {
  const [advice, setAdvice] = useState("Click the button to get advice");

  const getAdvice = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch {
      setAdvice("Failed to fetch advice. Please try again.");
    }
  };

  return (
    <div className="advice-box">
      <h3><b>💡Life Advice</b></h3>
      <p className="advice-text">"{advice}"</p>
      <button onClick={getAdvice}>Get Advice</button>
    </div>
  );
};

export default Advice;
