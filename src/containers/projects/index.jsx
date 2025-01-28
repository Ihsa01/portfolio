import React, { useEffect, useState } from "react";
import './styles.scss';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get('http://localhost:8080/api/projects')
            .then((response) => {
                setProjects(response.data.response);
            })
            .catch((error) => {
                console.error('Error fetching projects:', error);
                setProjects([]);
            });
    }, []);

    const handleCardClick = (project) => {
        navigate(`/projects/${project.id}`, { state: { project } });
    };

    return (
        <div className="projects-container">
            <h1>MY PROJECTS</h1>
            <div className="projects-cards">
                {Array.isArray(projects) && projects.map((project, index) => (
                    <div 
                        key={index} 
                        className="project-card" 
                        onClick={() => handleCardClick(project)}
                    >
                        <img 
                            src={project.image} 
                            alt={project.name} 
                        />
                        <div className="project-details">
                            <h3>{project.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
