import { useEffect, useState } from "react";
import {
    fetchReminders,
    addReminder,
    editReminder,
    removeReminder,
    markReminderComplete
} from "../services/reminderService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import getErrorMessage from "../utils/getErrorMessage";



function Reminder({ interviewId }) {

    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingReminder, setEditingReminder] = useState(null);
    const [formData, setFormData] = useState({
    title:"",
    description:"",
    reminderDate:"",
    completed:false
    });


    useEffect(() => {
        loadReminders();
    }, [interviewId]);

    useEffect(() => {

        if(editingReminder){

            setFormData({
                title: editingReminder.title,
                description: editingReminder.description,
                reminderDate: editingReminder.reminderDate,
                completed: editingReminder.completed
            });

        }

    }, [editingReminder]);


    const loadReminders = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await fetchReminders(interviewId);

            setReminders(data);

        } catch (error) {

            console.error(error);
            toast.error(getErrorMessage(error));

        } finally {

            setLoading(false);

        }
    };


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if(editingReminder){

                await editReminder(
                    editingReminder.id,
                    formData
                );

                toast.success("Reminder updated");

                setEditingReminder(null);

            }
            else{

                await addReminder(
                    interviewId,
                    formData
                );

                toast.success("Reminder created");

            }


            setFormData({
                title:"",
                description:"",
                reminderDate:"",
                completed:false
            });


            loadReminders();


        } catch(error) {

            console.log(error);

            toast.error("Failed to complete action");

        }

    };


    const handleComplete = async (id) => {

        await markReminderComplete(id);

        toast.success("Reminder completed");

        loadReminders();

    };


    const handleDelete = async (id) => {
        
        const result = await Swal.fire({
            title: "Delete Reminder?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) {
            return;
        }

        await removeReminder(id);

        toast.success("Reminder deleted");

        loadReminders();

    };

    const handleEdit = (reminder) => {

        setEditingReminder(reminder);

    };

    // if (loading) return <Loader />;

    // if (error) return <ErrorMessage message={error} />;

    // if (reminders.length === 0) {
    //     return <EmptyState message="No reminders found." />;
    // }

    return (

        <div>

            <h3>Reminders</h3>


            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 mb-5"
            >

                <input
                    className="border rounded px-3 py-2"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />


                <input
                    className="border rounded px-3 py-2"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />


                <input
                    className="border rounded px-3 py-2"
                    type="date"
                    name="reminderDate"
                    value={formData.reminderDate}
                    onChange={handleChange}
                />


                <button
                    type="submit"
                    className="w-fit px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {editingReminder ? "Update Reminder" : "Add Reminder"}
                </button>


                {
                    editingReminder && (
                        <button
                            type="button"
                            className="w-fit px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            onClick={() => {
                                setEditingReminder(null);
                                setFormData({
                                    title:"",
                                    description:"",
                                    reminderDate:"",
                                    completed:false
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )
                }

            </form>


        <hr/>

        {
            loading ? (

                <Loader />

            ) : error ? (

                <ErrorMessage message={error} />

            ) : reminders.length === 0 ? (

                <EmptyState
                    icon="⏰"
                    title="No reminders found"
                    message="Create a reminder to stay on top of your interviews."
                />

            ) : (

                reminders.map((reminder) => (

                    <div
                        key={reminder.id}
                        className="border rounded-lg p-4 mb-4 shadow hover:shadow-lg transition duration-200 hover:-translate-y-1"
                    >

                        <h4>{reminder.title}</h4>

                        <p>{reminder.description}</p>

                        <p>Date: {reminder.reminderDate}</p>

                        <p>
                            Status:
                            {reminder.completed ? " Completed" : " Pending"}
                        </p>

                        <div className="flex gap-3 mt-3">

                            {
                                !reminder.completed &&
                                <button
                                    className="px-3 py-1 bg-green-500 text-white rounded"
                                    onClick={() => handleComplete(reminder.id)}
                                >
                                    Complete
                                </button>
                            }

                            <button
                                className="px-3 py-1 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(reminder.id)}
                            >
                                Delete
                            </button>

                            <button
                                className="px-3 py-1 bg-blue-500 text-white rounded"
                                onClick={() => handleEdit(reminder)}
                            >
                                Edit
                            </button>

                        </div>

                    </div>

                ))

            )
        }


        </div>

    );
}


export default Reminder;