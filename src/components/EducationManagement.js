import { useState, useEffect } from "react";
import axios from "axios";
import "./EducationManagement.css";

const EducationManagement = () => {
    const [education, setEducation] = useState([]);
    const [newEducation, setNewEducation] = useState({ std: "", school: "" });
    const [editEducation, setEditEducation] = useState(null);
    const [editFormData, setEditFormData] = useState({ std: "", school: "" });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/education");
            setEducation(response.data.response || []);
        } catch (err) {
            console.error("Error fetching education:", err);
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
      } catch (err) {
          console.error("Error adding education:", err.response ? err.response.data : err.message);
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
          await axios.put(`http://localhost:8080/api/education/${editEducation}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
          });
          setEditEducation(null);
          fetchEducation();
      } catch (err) {
          console.error("Error updating education:", err.response ? err.response.data : err.message);
      }
  };
  
    const handleDelete = async (eduId) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:8080/api/education/${eduId}`);
                fetchEducation();
            } catch (err) {
                console.error("Error deleting education:", err);
            }
        }
    };

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
                                <button className="delete-button" onClick={() => handleDelete(edu.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editEducation && (
                <form className="edit-education-form" onSubmit={handleUpdate}>
                    <input
                        type="text"
                        placeholder="Standard"
                        value={editFormData.std}
                        onChange={(e) => setEditFormData({ ...editFormData, std: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="School Name"
                        value={editFormData.school}
                        onChange={(e) => setEditFormData({ ...editFormData, school: e.target.value })}
                    />
                    <button type="submit" className="save-btn">Save Changes</button>
                    <button type="button" className="cancel-btn" onClick={() => setEditEducation(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default EducationManagement;
