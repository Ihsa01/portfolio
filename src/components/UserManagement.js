import { useState, useEffect } from "react";
import axios from "axios";
import "./UserManagement.css";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", password: "" });
    const [editUserId, setEditUserId] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/auth/users");
            setUsers(response.data || []);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/register", newUser, {
                headers: { "Content-Type": "application/json" },
            });
            setShowAddForm(false);
            setNewUser({ username: "", password: "" });
            fetchUsers();
        } catch (err) {
            console.error("Error adding user:", err);
        }
    };

    const handleEditPassword = (userId) => {
        setEditUserId(userId);
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/auth/users/${editUserId}/update-password`, newPassword, {
                headers: { "Content-Type": "text/plain" },
            });
            setEditUserId(null);
            setNewPassword("");
            fetchUsers();
        } catch (err) {
            console.error("Error updating password:", err);
        }
    };

    return (
        <div className="user-management">
            <div className="header">
                <h2>Manage Users</h2>
                <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
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
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            
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
                    <button type="submit">Save Password</button>
                    <button type="button" onClick={() => setEditUserId(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default UserManagement;
