import React, { useEffect, useState } from "react";
import axios from 'axios';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // Fetch skills from backend using Axios
        axios.get("http://localhost:8080/api/skills")
            .then(response => {
                setSkills(response.data);
            })
            .catch(error => {
                console.error("Error fetching skills:", error);
            });
    }, []);

    return (
        <div className="about-container">
            <div className="about-content">
                <div className="about">
                    <h1>ABOUT ME</h1>
                    <p>
                        I am a passionate software developer who enjoys coding and solving real-world problems.
                        With a focus on creating efficient and scalable solutions, I am always learning and exploring new technologies.
                    </p>
                </div>
                <div className="about-image">
                    <img src={require('../../assets/images/devgirl.png')} alt="About Me" />
                </div>
            </div>

            <div className="skill-container">
                <h2>Skills</h2>
                <div className="skills">
                    {skills.length > 0 ? (
                        skills.map(skill => (
                            <div className="skill-row" key={skill.id}>
                                <div className="skill">
                                    <img 
                                        src={skill.image} 
                                        alt={skill.name} 
                                        className="skill-image"
                                    />
                                    {/* <h3>{skill.name}</h3> */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading skills...</p>
                    )}
                </div>
            </div>

            <section className="education-section">
                <h2>Education</h2>
                <div className="education-columns">
                    <div className="education-box">
                        <h3>B.Tech in Computer Science & Engineering</h3>
                        <p>Graduated from NSS College of Engineering</p>
                    </div>
                    <div className="education-box">
                        <h3>12th Grade</h3>
                        <p>Graduated from GHSS Sivapuram, Calicut</p>
                    </div>
                    <div className="education-box">
                        <h3>10th Grade</h3>
                        <p>Graduated from GGHSS Balussery, Calicut</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
