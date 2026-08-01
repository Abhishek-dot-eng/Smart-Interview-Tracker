function StatCard({ title, value }) {
    return (
        <div className="bg-white shadow rounded-lg p-6 border">
            <h3 className="text-gray-500 text-sm font-medium">
                {title}
            </h3>

            <p className="text-3xl font-bold mt-2">
                {value}
            </p>
        </div>
    );
}

export default StatCard;