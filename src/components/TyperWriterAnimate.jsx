//make a typing animation

import React, { useState, useEffect } from "react";

const TypewriterText = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Learning Today", "Leading Tomorrow"];
  const wait = 3000;

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % words.length;
      const fullText = words[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1),
      );

      setTypingSpeed(isDeleting ? 70 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), wait);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typeTimer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(typeTimer);
  }, [text, isDeleting, typingSpeed, loopNum]);

  return (
    <div className="text-center">
      {/* add a unicode space in h1 below to avoid text jumping around  */}
      <h1 className="text-2xl font-bold mt-4 tracking-wider font-tourney text-white">
        &nbsp;{text}|&nbsp;
      </h1>
    </div>
  );
};

export default TypewriterText;
