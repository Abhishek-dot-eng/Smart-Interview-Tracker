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
            className="
                border
                dark:border-gray-700
                rounded-lg
                p-4
                mb-4
                shadow
                hover:shadow-lg
                transition
                duration-200
                hover:-translate-y-1
                bg-white
                dark:bg-gray-800
                text-gray-900
                dark:text-white
            "
        >

            <h2 className="
                text-xl
                font-semibold
                text-gray-900
                dark:text-white
            ">
                {interview.company}
            </h2>


            <p className="
                text-gray-700
                dark:text-gray-300
            ">
                {interview.role}
            </p>


            <StatusBadge 
                status={interview.status}
            />


            <div className="mt-3 flex flex-wrap gap-2">


                <button
                    onClick={() =>
                        setSelectedInterview(interview)
                    }
                    className="
                        bg-blue-500
                        hover:bg-blue-600
                        text-white
                        px-3
                        py-1
                        rounded
                        transition
                    "
                >
                    Edit
                </button>



                <button
                    onClick={() =>
                        onDelete(interview.id)
                    }
                    className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-3
                        py-1
                        rounded
                        transition
                    "
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
                    className="
                        bg-gray-500
                        hover:bg-gray-600
                        dark:bg-gray-700
                        dark:hover:bg-gray-600
                        text-white
                        px-3
                        py-1
                        rounded
                        transition
                    "
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