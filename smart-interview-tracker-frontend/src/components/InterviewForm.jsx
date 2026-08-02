import { useState, useEffect, forwardRef, useRef } from "react";

const InterviewForm = forwardRef(
({ onAddInterview, selectedInterview, onUpdateInterview }, ref) => {

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Applied");
    const companyInputRef = useRef(null);


    useEffect(() => {

        if(selectedInterview){

            setCompany(selectedInterview.company);
            setRole(selectedInterview.role);
            setDate(selectedInterview.interviewDate);
            setStatus(selectedInterview.status);


            setTimeout(() => {
                companyInputRef.current?.focus();
            }, 300);

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
            ref={ref}
            onSubmit={handleSubmit}
            className="
                border
                dark:border-gray-700
                p-4
                md:p-6
                rounded-lg
                shadow
                mb-6
                w-full
                overflow-hidden
                bg-white
                dark:bg-gray-800
                text-gray-900
                dark:text-white
            "
        >

            <h2 className="
                text-2xl
                font-bold
                mb-4
                text-gray-900
                dark:text-white
            ">
                {selectedInterview ? "Edit Interview" : "Add Interview"}
            </h2>


            <input
                ref={companyInputRef}
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="
                    border
                    dark:border-gray-700
                    p-2
                    w-full
                    mb-3
                    rounded
                    bg-white
                    dark:bg-gray-900
                    text-gray-900
                    dark:text-white
                    placeholder-gray-500
                "
            />


            <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="
                    border
                    dark:border-gray-700
                    p-2
                    w-full
                    mb-3
                    rounded
                    bg-white
                    dark:bg-gray-900
                    text-gray-900
                    dark:text-white
                    placeholder-gray-500
                "
            />


            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="
                    border
                    dark:border-gray-700
                    p-2
                    w-full
                    mb-3
                    rounded
                    bg-white
                    dark:bg-gray-900
                    text-gray-900
                    dark:text-white
                "
            />


            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="
                    border
                    dark:border-gray-700
                    p-2
                    w-full
                    max-w-full
                    mb-4
                    rounded
                    bg-white
                    dark:bg-gray-900
                    text-gray-900
                    dark:text-white
                "
            >

                <option>Applied</option>
                <option>Interview Scheduled</option>
                <option>Offer</option>
                <option>Completed</option>
                <option>Rejected</option>

            </select>


            <button
                className="
                    bg-blue-600
                    hover:bg-blue-700
                    dark:bg-blue-700
                    dark:hover:bg-blue-800
                    text-white
                    px-4
                    py-2
                    rounded
                    w-full
                    sm:w-auto
                    transition
                "
            >
                {selectedInterview ? "Update Interview" : "Save Interview"}
            </button>


        </form>

    );

})


export default InterviewForm;