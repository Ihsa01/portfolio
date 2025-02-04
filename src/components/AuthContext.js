import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAdmin({ username: localStorage.getItem("username") });
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", {
                username,
                password,
            });

            const accessToken = res.data.token; 

            if (accessToken) {
                localStorage.setItem("token", accessToken);
                localStorage.setItem("username", username);
                setToken(accessToken);
                setAdmin({ username });
                return true;
            }
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null);
        setAdmin(null);
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
