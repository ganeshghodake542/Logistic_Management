import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";


const AuthPage = () => {

    const { login, register, user } = useAuth();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loginHandleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);


        try {

            const loggedInUser = await login(loginData);


            if (!loggedInUser?.role) {
                throw new Error("Could not verify account role");
            }


            if (loggedInUser.role == "admin"){
                navigate("/admin/dashboard")
            }
            else if (loggedInUser.role == "coustomer"){
                navigate("/coustomer/dashboard")
            }
            else{
                navigate("/driver/dashboard")
            }


        } catch (error) {

        }
    }



    return (
        <div>

        </div>
    )
}

export default authPage
