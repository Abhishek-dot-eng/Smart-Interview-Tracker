function StatusBadge({ status }) {

    const styles = {
        Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",

        Scheduled: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",

        Completed: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",

        Offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200",

        Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
    };


    return (

        <span
            className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                ${
                    styles[status] ||
                    "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                }
            `}
        >
            {status}
        </span>

    );

}


export default StatusBadge;