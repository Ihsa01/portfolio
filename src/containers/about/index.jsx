import React, { useEffect, useState } from "react";
import axios from 'axios';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import fallback from '../../assets/icons/fallbackSkill.svg'

const About = () => {
    const [skills, setSkills] = useState([]); 
    const [education, setEducation] = useState([]); 

    // Fetch skills
    useEffect(() => {
        axios.get("http://localhost:8080/api/skills")
            .then(response => {
                setSkills(response.data.response || []); 
            })
            .catch(error => {
                console.error("Error fetching skills:", error);
                setSkills([]); 
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/api/education")
            .then(response => {
                setEducation(response.data.response || []); 
            })
            .catch(error => {
                console.error("Error fetching education:", error);
                setEducation([]); 
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
                                        src={skill.image || fallback} 
                                        alt={skill.name} 
                                        className="skill-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = fallback;
                                        }}
                                    />
                                  
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No skills available.</p>
                    )}
                </div>
            </div>

            <section className="education-section">
                <h2>Education</h2>
                <div className="education-columns">
                    {education.length > 0 ? (
                        education.map(item => (
                            <div className="education-box" key={item.id}>
                                <h3>{item.std}</h3>
                                <p>{item.school}</p>
                            </div>
                        ))
                    ) : (
                        <p>No education details available.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default About;
