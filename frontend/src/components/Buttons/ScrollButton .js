import React, { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '20%',
    right: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    backgroundColor: isHovered ? '#DBA162' : 'white',
    color: isHovered ? 'white' : '#DBA162',
    border: 'none',
    outline: 'none',
    zIndex: "100"
  };

  const iconStyle = {
    fontSize: '35px'
  }

  return (
    <button
      style={buttonStyle}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Scroll to top"
    >
      <i className="bi bi-arrow-up-circle-fill" style={iconStyle}></i>
    </button>
  );
};

export default ScrollButton;
