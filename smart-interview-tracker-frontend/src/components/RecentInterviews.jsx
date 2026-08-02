function RecentInterviews({ interviews }) {


    return (

        <div className="
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow-md
            p-6
            text-gray-900
            dark:text-white
        ">


            <h2 className="
                text-xl 
                font-semibold 
                mb-4
                text-gray-900
                dark:text-white
            ">
                Recent Interviews
            </h2>


            {
                interviews.length === 0 ? (

                    <p className="
                        text-gray-500
                        dark:text-gray-400
                    ">
                        No interviews available
                    </p>

                )
                :

                interviews.map((interview)=>(

                    <div
                        key={interview.id}
                        className="
                            border-b
                            dark:border-gray-700
                            py-3
                        "
                    >

                        <h3 className="
                            font-semibold
                            text-gray-900
                            dark:text-white
                        ">
                            {interview.company}
                        </h3>


                        <p className="
                            text-gray-700
                            dark:text-gray-300
                        ">
                            {interview.role}
                        </p>


                        <span className="
                            text-sm
                            text-gray-500
                            dark:text-gray-400
                        ">
                            {interview.status}
                        </span>


                    </div>

                ))

            }


        </div>

    );

}


export default RecentInterviews;