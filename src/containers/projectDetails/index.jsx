import React from "react";
import { useLocation } from "react-router-dom";
import './styles.scss';

const ProjectDetails = () => {
    const location = useLocation();
    const { project } = location.state || {};

    if (!project) {
        return <div>Project not found!</div>;
    }

    return (
        <div className="project-details-container">
            <h1>{project.name}</h1>
            <p>{project.description}</p>
        </div>
    );
};

export default ProjectDetails;
