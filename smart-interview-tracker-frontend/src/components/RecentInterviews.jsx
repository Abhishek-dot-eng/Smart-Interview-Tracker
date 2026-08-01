function RecentInterviews({interviews}) {


    return (

        <div className="bg-white rounded-xl shadow-md p-6">


            <h2 className="text-xl font-semibold mb-4">
                Recent Interviews
            </h2>


            {
                interviews.length === 0 ? (

                    <p className="text-gray-500">
                        No interviews available
                    </p>

                )
                :

                interviews.map((interview)=>(

                    <div
                        key={interview.id}
                        className="border-b py-3"
                    >

                        <h3 className="font-semibold">
                            {interview.company}
                        </h3>


                        <p>
                            {interview.role}
                        </p>


                        <span className="text-sm text-gray-500">
                            {interview.status}
                        </span>


                    </div>

                ))

            }


        </div>

    );

}


export default RecentInterviews;