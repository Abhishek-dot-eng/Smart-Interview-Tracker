function ErrorMessage({message}){

    return(
        <div className="p-4 text-red-600 bg-red-100 rounded-lg">
            {message}
        </div>
    );

}

export default ErrorMessage;