import React, { useState, useEffect } from "react";
import './styles.scss'; 
import logo from '../../assets/images/logo.png'

const Home = () => {
  const text = "Welcome to My Portfolio. I'm [Your Name]";
  const [displayedText, setDisplayedText] = useState("");
  const speed = 100; // Speed of the typewriting effect

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prevText) => prevText + text[index]);
      index += 1;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>{displayedText}</h1>
      </div>
      <div className="home-image1">
        <img src={logo} alt="image1" />
      </div>
    </div>
  );
};

export default Home;
