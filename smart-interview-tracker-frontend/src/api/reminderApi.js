import API from "./axios";


export const getReminders = async (interviewId) => {

    const response = await API.get(`/reminders/${interviewId}`);

    return response.data;
};


export const createReminder = async (interviewId, reminder) => {

    const response = await API.post(
        `/reminders/${interviewId}`,
        reminder
    );

    return response.data;
};


export const updateReminder = async (reminderId, reminder) => {

    const response = await API.put(
        `/reminders/${reminderId}`,
        reminder
    );

    return response.data;
};


export const deleteReminder = async (reminderId) => {

    await API.delete(`/reminders/${reminderId}`);
};


export const completeReminder = async (reminderId) => {

    const response = await API.patch(
        `/reminders/${reminderId}/complete`
    );

    return response.data;
};