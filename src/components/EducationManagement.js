import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./EducationManagement.css";

Modal.setAppElement('#root');

const EducationManagement = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newEducation, setNewEducation] = useState({ std: "", school: "" });

    const [editEducation, setEditEducation] = useState(null);  
    const [editFormData, setEditFormData] = useState({ std: "", school: "" });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [educationToDelete, setEducationToDelete] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/education");
            setEducation(response.data.response || []);
        } catch (err) {
            console.error("Error fetching education:", err);
            setError("Failed to load education data");
        } finally {
            setLoading(false);
        }
    };

    const handleAddEducation = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("std", newEducation.std);
        formData.append("school", newEducation.school);

        try {
            await axios.post("http://localhost:8080/api/education", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setShowAddForm(false);
            setNewEducation({ std: "", school: "" });
            fetchEducation(); 
            showAlert("Education added successfully!");
        } catch (err) {
            console.error("Error adding education:", err);
            showAlert("Failed to add education");
        }
    };

    const handleEdit = (edu) => {
        setEditEducation(edu.id);
        setEditFormData({ std: edu.std, school: edu.school });
        
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("std", editFormData.std);
        formData.append("school", editFormData.school);

        try {
            await axios.put(
                `http://localhost:8080/api/education/${editEducation}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setEditEducation(null);
            fetchEducation();
            showAlert("Education updated successfully!");
        } catch (err) {
            console.error("Error updating education:", err);
            showAlert("Failed to update education");
        }
    };

    const handleDelete = async () => {
        if (educationToDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/education/${educationToDelete}`);
                fetchEducation();
                setShowDeleteModal(false);
                showAlert("Education deleted successfully!");
            } catch (err) {
                console.error("Error deleting education:", err);
                showAlert("Failed to delete education");
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
        setNewEducation({ std: "", school: "" });
    };

    const handleCancelEdit = () => {
        setEditEducation(null);
        setEditFormData({ std: "", school: "" }); 
    };

    if (loading) return <div>Loading education data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="education-management">
            <div className="header">
                <h2>Manage Education</h2>
                <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? "Cancel" : "Add New Education"}
                </button>
            </div>

            {showAddForm && (
                <form className="add-education-form" onSubmit={handleAddEducation}>
                    <input
                        type="text"
                        placeholder="Standard"
                        value={newEducation.std}
                        onChange={(e) => setNewEducation({ ...newEducation, std: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="School Name"
                        value={newEducation.school}
                        onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                        required
                    />
                    <button type="submit" className="save-btn">Add Education</button>
                    <button type="button" className="cancel-btn" style={{ backgroundColor: "grey" }} onClick={handleCancelAdd}>Cancel</button>
                </form>
            )}

            <table className="education-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Standard</th>
                        <th>School</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {education.map((edu, index) => (
                        <tr key={edu.id}>
                            <td>{index + 1}</td>
                            <td>{edu.std}</td>
                            <td>{edu.school}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(edu)}>Edit</button>
                                <button className="delete-button" onClick={() => { setEducationToDelete(edu.id); setShowDeleteModal(true); }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editEducation && (

               
                
              
                    <form className= "edit-education-form" onSubmit={handleUpdate}>
                         <h3>Edit Education</h3>
                        <input
                            type="text"
                            placeholder="Standard"
                            value={editFormData.std}
                            onChange={(e) => setEditFormData({ ...editFormData, std: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="School Name"
                            value={editFormData.school}
                            onChange={(e) => setEditFormData({ ...editFormData, school: e.target.value })}
                            required
                        />
                        <button type="submit" className="save-btn">Save Changes</button>
                        <button type="button" className="cancel-btn" style={{ backgroundColor: "grey" }} onClick={handleCancelEdit}>Cancel</button>
                    </form>
            )}
            
               
            

            <Modal
                isOpen={showDeleteModal}
                onRequestClose={handleCancelDelete}
                contentLabel="Confirm Delete"
                className="confirm-delete-modal"
                overlayClassName="confirm-delete-overlay"
            >
                <div className="modal-content">
                    <h3>Are you sure you want to delete this education?</h3>
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

export default EducationManagement;
