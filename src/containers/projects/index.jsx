import React, { useEffect, useState } from "react";
import './styles.scss';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fallback from '../../assets/images/fallbackProj.jpeg';

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

    const handleCardClick = async (projectId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/projects/${projectId}`);
            const projectData = response.data.response; 

            navigate(`/projects/${projectId}`, { state: { project: projectData } });
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    return (
        <div className="projects-container">
            <h1>MY PROJECTS</h1>
            <div className="projects-cards">
                {Array.isArray(projects) && projects.map((project) => (
                    <div
                        key={project.id}
                        className="project-card"
                        onClick={() => handleCardClick(project.id)}
                    >
                        <img
                            src={project.image || fallback}
                            alt={project.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallback;
                            }}
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
