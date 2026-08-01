import API from "./axios";


export const getUpcomingReminders = () => {

    return API.get("/reminders/upcoming");

};


export const getRecentInterviews = () => {

    return API.get("/interviews/recent");

};