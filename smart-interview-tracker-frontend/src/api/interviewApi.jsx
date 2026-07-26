import API from "./axios";

export const getAllInterviews = () => API.get("/interviews");

export const createInterview = (data) =>
    API.post("/interviews", data);

export const updateInterview = (id, data) =>
    API.put(`/interviews/${id}`, data);

export const deleteInterview = (id) =>
    API.delete(`/interviews/${id}`);

export const searchInterviews = (params) =>
    API.get("/interviews/search", { params });