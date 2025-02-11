import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal"; 
import "./UserManagement.css";

Modal.setAppElement("#root");

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", password: "" });
    const [editUserId, setEditUserId] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/auth/users");
            console.log("Fetched Users:", response.data.response);
            setUsers(Array.isArray(response.data.response) ? response.data.response : []);
        } catch (err) {
            console.error("Error fetching users:", err);
            setUsers([]);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/register", newUser, {
                headers: { "Content-Type": "application/json" },
            });
            setModalMessage("User added successfully!");
            setShowModal(true);
            setShowAddForm(false);
            setNewUser({ username: "", password: "" });
            fetchUsers();

            setTimeout(() => setShowModal(false), 2000);
        } catch (err) {
            setModalMessage("Username already exists");
            setShowModal(true);
            console.error("Error adding user:", err);

            setTimeout(() => setShowModal(false), 2000);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8080/api/auth/users/${editUserId}/update-password`,
                { newPassword: newPassword },
                { headers: { "Content-Type": "application/json" } }
            );
            setModalMessage("Password updated successfully!");
            setShowModal(true);
            resetEditForm();
            fetchUsers();

            setTimeout(() => setShowModal(false), 3000);
        } catch (err) {
            setModalMessage("Error updating password. Try again.");
            setShowModal(true);
            console.error("Error updating password:", err);

            setTimeout(() => setShowModal(false), 3000);
        }
    };

    const resetEditForm = () => {
        setEditUserId(null);
        setNewPassword("");
    };

    return (
        <div className="user-management">
            <div className="header">
                <h2>Manage Users</h2>
                <button className="add-button" onClick={() => {setShowAddForm(!showAddForm); setNewUser({ username: "", password: "" });}}>
                    {showAddForm ? "Cancel" : "Add New User"}
                </button>
            </div>

            {showAddForm && (
                <form className="add-user-form" onSubmit={handleAddUser}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                    />
                    <button type="submit">Register User</button>
                </form>
            )}

            <table className="users-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>
                                <button className="edit-btn" onClick={() => setEditUserId(user.id)}>Update Password</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editUserId && (
                <form className="update-password-form" onSubmit={handleUpdatePassword}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit" style={{ backgroundColor: '#4CAF50', color: "white" }}>Save Password</button>
                    <button type="button" style={{ backgroundColor: "grey", color: "white" }} onClick={resetEditForm}>Cancel</button>
                </form>
            )}

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)} 
                contentLabel="Modal"
                ariaHideApp={false} 
                className="modal-content" 
                overlayClassName="modal-overlay" 
            >
                <p>{modalMessage}</p>
            </Modal>
        </div>
    );
};

export default UserManagement;
