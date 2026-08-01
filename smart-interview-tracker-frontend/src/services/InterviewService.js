import API from "../api/axios";


export const getInterviews = () => {
    return API.get("/interviews");
};


export const createInterview = (data) => {
    return API.post("/interviews", data);
};


export const updateInterview = (id, data) => {
    return API.put(`/interviews/${id}`, data);
};


export const deleteInterview = (id) => {
    return API.delete(`/interviews/${id}`);
};