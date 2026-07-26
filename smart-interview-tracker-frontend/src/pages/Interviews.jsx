import { useEffect, useState } from "react";
import {
    getAllInterviews,
    createInterview,
    deleteInterview,
    updateInterview,
    searchInterviews
} from "../api/interviewApi";
import Navbar from "../components/Navbar";
import InterviewForm from "../components/InterviewForm";

function Interviews() {

    const [interviews, setInterviews] = useState([]);
    const [selectedInterview, setSelectedInterview] = useState(null);

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [upcoming, setUpcoming] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadInterviews();
    }, []);

    const loadInterviews = async () => {

    try {

        setLoading(true);

        const response = await getAllInterviews();

        setInterviews(response.data);

    } catch(error) {

        console.error(error);

    } finally {

        setLoading(false);

    }
    };

    const handleAddInterview = async (interviewData) => {
    try {
        await createInterview(interviewData);

        // Reload the list after adding
        loadInterviews();

    } catch (error) {
        console.log(error);
    }
    };

    const handleDeleteInterview = async (id) => {

    try {

        await deleteInterview(id);

        loadInterviews();

    } catch(error){

        console.log(error);

    }

    };

    const handleUpdateInterview = async(id,data)=>{

    try{

        await updateInterview(id,data);

        setSelectedInterview(null);

        loadInterviews();

    }
    catch(error){

        console.log(error);

    }

    };

    const handleSearch = async () => {

    try {

        setLoading(true);

        const response = await searchInterviews({
            company,
            role,
            status,
            from,
            to,
            upcoming
        });

        setInterviews(response.data);

    } catch(error) {

        console.error("Search failed:", error);

    } finally {

        setLoading(false);

    }
    };

    const handleReset = async () => {

    setCompany("");
    setRole("");
    setStatus("");
    setFrom("");
    setTo("");
    setUpcoming(false);

    await loadInterviews();

    };

    return (
    <>
        <Navbar />
        <div className="p-6">

            <InterviewForm
                onAddInterview={handleAddInterview}
                selectedInterview={selectedInterview}
                onUpdateInterview={handleUpdateInterview}
            />

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">

                <h2 className="text-xl font-semibold mb-4">
                    Search & Filters
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Company */}
                    <input
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="border rounded px-3 py-2"
                    />

                    {/* Role */}
                    <input
                        type="text"
                        placeholder="Job Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border rounded px-3 py-2"
                    />

                    {/* Status */}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">All Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                    {/* From Date */}
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="border rounded px-3 py-2"
                    />

                    {/* To Date */}
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="border rounded px-3 py-2"
                    />

                    {/* Upcoming */}
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={upcoming}
                            onChange={(e) => setUpcoming(e.target.checked)}
                        />
                        Upcoming Interviews
                    </label>

                </div>

                <div className="mt-4 flex gap-3">

                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>

                    <button
                        onClick={handleReset}
                        disabled={loading}
                        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Reset
                    </button>

                </div>

            </div>

            <p className="text-gray-600 mb-3">
                Total Interviews: {interviews.length}
            </p>

            <h1 className="text-3xl font-bold mb-6">

                Interviews

            </h1>

            {
                loading && (
                    <p className="text-center text-gray-600">
                        Loading interviews...
                    </p>
                )
            }

            {
                !loading && interviews.length === 0 && (
                    <p className="text-center text-gray-600">
                        No interviews found.
                    </p>
                )
            }

            {
                interviews.map((interview) => (

                    <div
                        key={interview.id}
                        className="border rounded-lg p-4 mb-4 shadow"
                    >

                    <h2 className="text-xl font-semibold">
                        {interview.company}
                    </h2>

                    <p>{interview.role}</p>

                    <p>{interview.status}</p>

                    <button
                        onClick={() => setSelectedInterview(interview)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mt-3 mr-2"
                    >
                        Edit
                    </button>
                    
                    <button
                        onClick={() => handleDeleteInterview(interview.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded mt-3"
                    >
                        Delete
                    </button>

                    </div>

                ))
            }

        </div>
        </>
    );

}

export default Interviews;