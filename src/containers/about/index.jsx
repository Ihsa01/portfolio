import React from "react";
import './styles.scss';
import html from '../../assets/icons/html.svg';
import css from '../../assets/icons/css.svg';
import java from '../../assets/icons/java.svg';
import spring from '../../assets/icons/spring.svg';
import react from '../../assets/icons/react.svg';
import python from '../../assets/icons/python.svg';
import cp from '../../assets/icons/cp.svg';
import js from '../../assets/icons/js.svg';
import git from '../../assets/icons/git.svg';
import sql from '../../assets/icons/sql.svg';
import image1 from '../../assets/images/devgirl.png';


const About = () => {
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
                    <img src={image1} alt="About Me" />
                </div>
            </div>
            <div className="skill-container">
                <h2>Skills</h2>
                <div className="skills">
                    <div className="skill-row">
                        <img src={react} alt="React" />
                        <img src={python} alt="Python" />
                        <img src={java} alt="Java" />
                        <img src={spring} alt="Spring" />
                        <img src={cp} alt="C++" />
                        <img src={git} alt="Git" />
                    </div>
                    <div className="skill-row">
                        <img src={html} alt="HTML" />
                        <img src={css} alt="CSS" />
                        <img src={js} alt="JavaScript" />
                        <img src={sql} alt="SQL" />
                    </div>
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
