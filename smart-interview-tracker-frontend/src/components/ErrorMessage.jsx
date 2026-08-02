function ErrorMessage({ message }) {

    return (
        <div
            className="
                p-4
                rounded-lg
                bg-red-100
                text-red-600
                dark:bg-red-900
                dark:text-red-200
            "
        >
            {message}
        </div>
    );

}

export default ErrorMessage;