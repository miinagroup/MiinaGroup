import React, { useState } from 'react';
import "./page.css"

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisibility);

  return (

        <i className={`scroll-to-top bi bi-arrow-up-circle-fill ${isVisible ? 'visible' : ''}`}onClick={scrollToTop}></i>

  );
};

export default ScrollButton;
