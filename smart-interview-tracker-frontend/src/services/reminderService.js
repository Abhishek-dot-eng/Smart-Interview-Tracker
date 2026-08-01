import {
    getReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    completeReminder
} from "../api/reminderApi";


export const fetchReminders = (interviewId) => {
    return getReminders(interviewId);
};


export const addReminder = (interviewId, data) => {
    return createReminder(interviewId, data);
};


export const editReminder = (id, data) => {
    return updateReminder(id, data);
};


export const removeReminder = (id) => {
    return deleteReminder(id);
};


export const markReminderComplete = (id) => {
    return completeReminder(id);
};