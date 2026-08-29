import { useEffect } from "react";
import api from "../api/axios"
import { useContext, useState, createContext } from "react"

const AuthContext = createContext();


const AuthProvider = ({ children }) => {


    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const res = await api.get("/user/me")
                setUser(res.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false)
            }
        }
        checkLoggedIn();
    }, [])


    const login = async (formData) => {
        const res = await api.post("/user/login", formData)

        if (res.data.success) {
            setUser(res.data.user);
            return res.data.user;
        }

        throw new Error(res.data.message);
    }


    const register = async (formData) => {
        const res = await api.post("/user/register", formData);

        if (res.data.success) {
            setUser(res.data.user);
            return res.data.user;
        }
        throw new Error(res.data.message);
    }

    const logout = async () => {
        await api.post("/user/logout");
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthProvider);