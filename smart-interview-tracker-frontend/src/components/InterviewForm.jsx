import { useState , useEffect } from "react";

function InterviewForm({ onAddInterview, selectedInterview, onUpdateInterview }) {

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Applied");

    useEffect(() => {

    if(selectedInterview){

        setCompany(selectedInterview.company);
        setRole(selectedInterview.role);
        setDate(selectedInterview.interviewDate);
        setStatus(selectedInterview.status);

    }

    }, [selectedInterview]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const interviewData = {
        company,
        role,
        interviewDate: date,
        status
    };

    if(selectedInterview){

    onUpdateInterview(
        selectedInterview.id,
        interviewData
    );

    }
    else{

    onAddInterview(interviewData);

    }

    setCompany("");
    setRole("");
    setDate("");
    setStatus("Applied");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border p-6 rounded-lg shadow mb-6"
        >

            <h2 className="text-2xl font-bold mb-4">
                Add Interview
            </h2>

            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border p-2 w-full mb-3 rounded"
            />

            <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 w-full mb-3 rounded"
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 w-full mb-3 rounded"
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 w-full mb-4 rounded"
            >
                <option>Applied</option>
                <option>Interview Scheduled</option>
                <option>Completed</option>
                <option>Rejected</option>
            </select>

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {selectedInterview ? "Update Interview" : "Save Interview"}
            </button>

        </form>
    );
}

export default InterviewForm;