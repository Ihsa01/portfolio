import { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectManagement.css";

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newProject, setNewProject] = useState({ name: "", description: "", image: null });

    // State for edit project form
    const [editProject, setEditProject] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", description: "", image: "" });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/projects");
            setProjects(response.data.response || []);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    // Handle Add Project Form
    const handleAddProject = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", newProject.name);
        formData.append("description", newProject.description);
        if (newProject.image) {
            formData.append("image", newProject.image);
        }

        try {
            await axios.post("http://localhost:8080/api/projects", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setShowAddForm(false);
            setNewProject({ name: "", description: "", image: null });
            fetchProjects(); // Refresh the list
        } catch (err) {
            console.error("Error adding project:", err);
            alert("Failed to add project");
        }
    };

    // Handle Edit Click
    const handleEdit = async (project) => {
        setEditProject(project.id); // Track which project is being edited
        setEditFormData({
            name: project.name,
            description: project.description,  // Set default description value
            image: null // You can set the image as null or any appropriate default value
        });
        try {
            const response = await axios.get(`http://localhost:8080/api/projects/${project.id}`);
            setEditProject(project.id);
            setEditFormData(response.data);
        } catch (err) {
            console.error("Error fetching project details:", err);
            alert("Failed to load project details");
        }
    };

    // Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Only add fields that are changed or provided
        if (editFormData.name) formData.append("name", editFormData.name);
        if (editFormData.description) formData.append("description", editFormData.description);

        // If an image file is selected, add it to FormData
        if (editFormData.image) formData.append("image", editFormData.image);

        try {
            // Perform the PUT request with the FormData
            await axios.put(
                `http://localhost:8080/api/projects/${editProject}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            // Reset form and fetch the updated projects list
            setEditProject(null); // Close the edit form
            fetchProjects(); // Refresh the list
        } catch (err) {
            console.error("Error updating project:", err);
            alert("Failed to update project");
        }
    };


    const handleDelete = async (projectId) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await axios.delete(`http://localhost:8080/api/projects/${projectId}`);
                fetchProjects();
            } catch (err) {
                console.error("Error deleting project:", err);
                alert("Failed to delete project");
            }
        }
    };

    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="project-management">
            <div className="header">
                <h2>Manage Projects</h2>
                <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? "Cancel" : "Add New Project"}
                </button>
            </div>

            {/* Add Project Form */}
            {showAddForm && (
                <form className="add-project-form" onSubmit={handleAddProject}>
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        required
                    />
                    <input
                        type="file"
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
                    />
                    <button type="submit" className="save-btn">Add Project</button>
                </form>
            )}

            <table className="projects-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={project.id}>
                            <td>{index + 1}</td>
                            <td>{project.name}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(project)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(project.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Form */}
            {editProject && (
                <div className="edit-project-form">
                    <h3>Edit Project</h3>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            placeholder="Project Name"
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        />
                        <textarea
                            placeholder="Project Description"
                            value={editFormData.description}  // Default to project description
                            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                        />

                        <input
                            type="file"
                            onChange={(e) => setEditFormData({ ...editFormData, image: e.target.files[0] })}
                        />
                        <button type="submit" className="save-btn">Save Changes</button>
                        <button type="button" className="cancel-btn" onClick={() => setEditProject(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProjectManagement;
