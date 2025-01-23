import React from "react";
import './styles.scss';
import Lottie from 'react-lottie-player'; 
import animationData from '../../assets/animation/contact.json'; // Path to your JSON file
import insta from '../../assets/icons/insta.svg';
import linked from '../../assets/icons/linked.svg';
import git from '../../assets/icons/git.svg';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-content">
                
                <div className="contact-form">
                    <h1>Contact Me</h1>
                    <form>
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="contact-animation">
                <Lottie
                        loop
                        animationData={animationData}
                        play
                        style={{ height: 400, width: 400 }} // Adjust size as needed
                    />
                </div>
            </div>
            <div className="connect-section">
                <h2>Connect with Me</h2>
                <div className="connect-icons">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <img src={insta} alt="Instagram" style={{ width: '40px', height: '40px' }} />
</a>

<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
    <img src={linked} alt="LinkedIn" style={{ width: '60px', height: '60px' }} />
</a>

<a href="https://github.com" target="_blank" rel="noopener noreferrer">
    <img src={git} alt="GitHub" style={{ width: '60px', height: '60px' }} />
</a>
                </div>
            </div>
        </div>
    );
}

export default Contact;
