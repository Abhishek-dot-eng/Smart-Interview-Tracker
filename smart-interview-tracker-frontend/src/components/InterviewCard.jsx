import Reminder from "./Reminder";
import StatusBadge from "./StatusBadge";


function InterviewCard({
    interview,
    selectedInterview,
    setSelectedInterview,
    onDelete
}) {


    return (

        <div
            className="border rounded-lg p-4 mb-4 shadow hover:shadow-lg transition duration-200 hover:-translate-y-1"
        >

            <h2 className="text-xl font-semibold">
                {interview.company}
            </h2>


            <p>
                {interview.role}
            </p>


            <StatusBadge status={
                interview.status
                } 
            />


            <div className="mt-3">


                <button
                    onClick={() =>
                        setSelectedInterview(interview)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                    Edit
                </button>



                <button
                    onClick={() =>
                        onDelete(interview.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                >
                    Delete
                </button>



                <button
                    onClick={() =>
                        setSelectedInterview(
                            selectedInterview === interview.id
                            ? null
                            : interview.id
                        )
                    }
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                >

                    {
                        selectedInterview === interview.id
                        ? "Hide Reminders"
                        : "Show Reminders"
                    }

                </button>


            </div>


            {
                selectedInterview === interview.id &&
                <Reminder 
                    interviewId={interview.id}
                />
            }


        </div>

    );

}


export default InterviewCard;