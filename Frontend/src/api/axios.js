import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})


export const login = () => api.post("/user/login");
export const register = () => api.post("/user/register");
export const logout = () => api.post("/user/logout");


export default api;