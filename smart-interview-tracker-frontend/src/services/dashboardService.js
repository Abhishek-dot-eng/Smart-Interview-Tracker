import API from "../api/axios";

export const getDashboard = () => {
    return API.get("/dashboard");
};