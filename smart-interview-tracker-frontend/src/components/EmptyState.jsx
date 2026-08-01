function EmptyState({ 
    icon = "📂", 
    title = "No data found", 
    message = "There is nothing to display here."
}) {

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">

            {/* Icon */}
            <div className="text-6xl mb-6">
                {icon}
            </div>


            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
                {title}
            </h2>


            {/* Description */}
            <p className="text-gray-500 max-w-md">
                {message}
            </p>

        </div>
    );
}

export default EmptyState;