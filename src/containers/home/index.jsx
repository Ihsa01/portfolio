import React, { useState, useEffect } from "react";
import './styles.scss';
import logo from '../../assets/images/logo.png';
import { Link } from "react-router-dom";
import About from '../about';

const Home = () => {
  const lines = ["LEET'S CONNECT         ", " HI I'M IHSANA          "]; // Array for multiline text
  const [displayedText, setDisplayedText] = useState(["", ""]); // Text that will be typed out, one array item per line
  const [currentLine, setCurrentLine] = useState(0); // Track which line is being typed
  const speed = 100; // Speed of typewriting effect
  const pauseBetweenLines = 1000; // Pause before moving to next line

  useEffect(() => {
    let index = 0;
    let interval;

    const typeLine = (lineIndex) => {
     
      interval = setInterval(() => {
        if (index < 15) {
          setDisplayedText((prevText) => {
            const newText = [...prevText];
            newText[lineIndex] = newText[lineIndex] + lines[lineIndex][index];
            return newText;
          });
          index += 1;
        } else {
          clearInterval(interval);
         
          if (lineIndex < lines.length - 1) {
            setTimeout(() => {
              setCurrentLine(lineIndex + 1); // Move to the next line
              index = 0; // Reset the index for the next line
            }, pauseBetweenLines);
          }
        }
      }, speed);
    };

    typeLine(currentLine);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentLine]);

  return (
    <div className="home-container">
      <div className="container">
        <span className="text first-text">{displayedText[0]}</span>
        <span className="text sec-text">
          {displayedText[1]}
        </span>
      </div>
      <div className="home-image1">
        <img src={logo} alt="image1" />
      </div>
      <div className="about-me">
        <p>
          I'm a passionate Software Developer who enjoys coding and solving problems. 
          With a deep love for technology, I aim to build meaningful applications 
          that make a difference. If you're curious about my journey, feel free 
          to <Link to={"/about"}>Learn More About Me</Link>.
        </p>
      </div>
    </div>
  );
};

export default Home;
