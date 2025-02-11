import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./ProjectManagement.css";

Modal.setAppElement('#root');

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newProject, setNewProject] = useState({ name: "", description: "", image: null });

    const [editProject, setEditProject] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", description: "", image: "" });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

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
            showAlert("Project added successfully!");
        } catch (err) {
            console.error("Error adding project:", err);
            showAlert("Failed to add project");
        }
    };

    const handleEdit = async (project) => {
        setEditProject(project.id);
        setEditFormData({
            name: project.name,
            description: project.description,
            image: null
        });
        try {
            const response = await axios.get(`http://localhost:8080/api/projects/${project.id}`);
            setEditProject(project.id);
            setEditFormData(response.data);
        } catch (err) {
            console.error("Error fetching project details:", err);
            showAlert("Failed to load project details");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (editFormData.name) formData.append("name", editFormData.name);
        if (editFormData.description) formData.append("description", editFormData.description);

        if (editFormData.image) formData.append("image", editFormData.image);

        try {
            await axios.put(
                `http://localhost:8080/api/projects/${editProject}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setEditProject(null);
            fetchProjects();
            showAlert("Project updated successfully!");
        } catch (err) {
            console.error("Error updating project:", err);
            showAlert("Failed to update project");
        }
    };

    const handleDelete = async () => {
        if (projectToDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/projects/${projectToDelete}`);
                fetchProjects();
                setShowDeleteModal(false);
                showAlert("Project deleted successfully!");
            } catch (err) {
                console.error("Error deleting project:", err);
                showAlert("Failed to delete project");
            }
        }
    };

    const showAlert = (message) => {
        setModalMessage(message);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 4000);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleCancelAdd = () => {
        setShowAddForm(false);
        setNewProject({ name: "", description: "", image: null });
    };

    const handleCancelEdit = () => {
        setEditProject(null);
        setEditFormData({ name: "", description: "", image: "" });
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
                    <button
                        type="button"
                        className="cancel-btn"
                        style={{ backgroundColor: "grey" }}
                        onClick={handleCancelAdd}
                    >
                        Cancel
                    </button>
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
                                <button className="delete-btn" onClick={() => { setShowDeleteModal(true); setProjectToDelete(project.id); }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                            value={editFormData.description}
                            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                        />

                        <input
                            type="file"
                            onChange={(e) => setEditFormData({ ...editFormData, image: e.target.files[0] })}
                        />
                        <button type="submit" className="save-btn">Save Changes</button>
                        <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                    </form>
                </div>
            )}

            <Modal
                isOpen={showDeleteModal}
                onRequestClose={handleCancelDelete}
                contentLabel="Confirm Delete"
                className="confirm-delete-modal"
                overlayClassName="confirm-delete-overlay"
            >
                <div className="modal-content">
                    <h3>Are you sure you want to delete this project?</h3>
                    <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
                    <button className="cancel-btn" onClick={handleCancelDelete}>Cancel</button>
                </div>
            </Modal>

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Alert Modal"
                className="alert-modal"
                overlayClassName="alert-modal-overlay"
            >
                <div className="alert-modal-content">
                    <p>{modalMessage}</p>
                </div>
            </Modal>
        </div>
    );
};

export default ProjectManagement;
