import axios from "axios";

const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
});

api.interceptors.response.use(
        (response) => response,
        (error) => 
        {
                console.error("API ERROR:", error.response?.data || error.message);
                return Promise.reject(error);
        }
);


export default api;

