"use client"

import React, { useEffect } from 'react';
import JSConfetti from 'js-confetti'; 

const HeartClick = () => {
  useEffect(() => {
    const jsConfetti = new JSConfetti();

    const handleOnClick = (event:MouseEvent) => {
      jsConfetti.addConfetti({
        emojis: ['🥰'],
        emojiSize: 100,
        confettiNumber: 30,
      });
    };

    document.addEventListener('click', handleOnClick);

    return () => {
      document.removeEventListener('click', handleOnClick);
    };
  }, []);

  

  return (
      <>
      </>
  );
};

export default HeartClick;