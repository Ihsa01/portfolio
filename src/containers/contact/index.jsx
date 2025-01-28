import React, { useState } from "react";
import './styles.scss';
import Lottie from 'react-lottie-player'; 
import animationData from '../../assets/animation/contact.json'; 
import insta from '../../assets/icons/insta.svg';
import linked from '../../assets/icons/linked.svg';
import git from '../../assets/icons/git.svg';
import axios from "axios"; 

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [status, setStatus] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const messageData = {
            name,
            email,
            message
        };

        try {
            const response = await axios.post('http://localhost:8080/api/messages', messageData);
            
                setStatus("Message sent successfully!");
            
                setName("");
                setEmail("");
                setMessage("");
                setTimeout(() => {
                    setStatus("");
                }, 5000);
            
        } catch (error) {
            setStatus("Error sending message. Please try again.");
            console.error('Error sending message:', error);
        }
    };

   

    return (
        <div className="contact-container">
            <div className="contact-content">
                
                <div className="contact-form">
                    <h1>Contact Me</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    {status && <p>{status}</p>} 
                </div>
                
                <div className="contact-animation">
                    <Lottie
                        loop
                        animationData={animationData}
                        play
                        style={{ height: 400, width: 400 }} 
                    />
                </div>
            </div>

            <div className="connect-section">
                <h2>Connect with Me</h2>
                <div className="connect-icons">
                    <a href="https://www.instagram.com/ih.sana" target="_blank" rel="noopener noreferrer">
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
