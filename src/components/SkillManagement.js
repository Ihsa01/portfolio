import { useState, useEffect } from "react";
import axios from "axios";
import "./SkillManagement.css";

const SkillManagement = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [showAddForm, setShowAddForm] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: "", image: null });
    
    const [editSkill, setEditSkill] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", image: null });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/skills");
            setSkills(response.data.response || []);
        } catch (err) {
            console.error("Error fetching skills:", err);
            setError("Failed to load skills");
        } finally {
            setLoading(false);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", newSkill.name);
        if (newSkill.image) {
            formData.append("image", newSkill.image);
        }

        try {
            await axios.post("http://localhost:8080/api/skills", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setShowAddForm(false);
            setNewSkill({ name: "", image: null });
            fetchSkills();
        } catch (err) {
            console.error("Error adding skill:", err);
            alert("Failed to add skill");
        }
    };

    const handleEdit = (skill) => {
        setEditSkill(skill.id);
        setEditFormData({
            name: skill.name,
            image: null
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", editFormData.name);
        if (editFormData.image) formData.append("image", editFormData.image);

        try {
            await axios.put(
                `http://localhost:8080/api/skills/${editSkill}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setEditSkill(null);
            fetchSkills();
        } catch (err) {
            console.error("Error updating skill:", err);
            alert("Failed to update skill");
        }
    };

    const handleDelete = async (skillId) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            try {
                await axios.delete(`http://localhost:8080/api/skills/${skillId}`);
                fetchSkills();
            } catch (err) {
                console.error("Error deleting skill:", err);
                alert("Failed to delete skill");
            }
        }
    };

    if (loading) return <div>Loading skills...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="skill-management">
            <div className="header">
                <h2>Manage Skills</h2>
                <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? "Cancel" : "Add New Skill"}
                </button>
            </div>

            {showAddForm && (
                <form className="add-skill-form" onSubmit={handleAddSkill}>
                    <input
                        type="text"
                        placeholder="Skill Name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        required
                    />
                    <input
                        type="file"
                        onChange={(e) => setNewSkill({ ...newSkill, image: e.target.files[0] })}
                    />
                    <button type="submit" className="save-btn">Add Skill</button>
                </form>
            )}

            <table className="skills-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill, index) => (
                        <tr key={skill.id}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={skill.image} alt={skill.name} className="skill-image" />
                            </td>
                            <td>{skill.name}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(skill)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(skill.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editSkill && (
                <div className="edit-skill-form">
                    <h3>Edit Skill</h3>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            placeholder="Skill Name"
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        />
                        <input
                            type="file"
                            onChange={(e) => setEditFormData({ ...editFormData, image: e.target.files[0] })}
                        />
                        <button type="submit" className="save-btn">Save Changes</button>
                        <button type="button" className="cancel-btn" onClick={() => setEditSkill(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SkillManagement;
