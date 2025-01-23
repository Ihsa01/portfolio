import React from "react";
import './styles.scss';  // Make sure to include your styling file

const Projects = () => {
    const projects = [
        {
            title: "Project 1",
            image: "path_to_image1.jpg",  // Add the correct path to your image
            description: "Description of Project 1"
        },
        {
            title: "Project 2",
            image: "path_to_image2.jpg",  // Add the correct path to your image
            description: "Description of Project 2"
        },
        {
            title: "Project 3",
            image: "path_to_image3.jpg",  // Add the correct path to your image
            description: "Description of Project 3"
        }
    ];

    return (
        <div className="projects-container">
            <h1>MY PROJECTS</h1>
            <div className="projects-cards">
                {projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <img src={project.image} alt={project.title} />
                        <div className="project-details">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;
