function UpcomingReminders({reminders}) {


    return (

        <div className="bg-white rounded-xl shadow-md p-6">


            <h2 className="text-xl font-semibold mb-4">
                Upcoming Reminders
            </h2>


            {
                reminders.length === 0 ? (

                    <p className="text-gray-500">
                        No upcoming reminders
                    </p>

                )
                :

                (

                    reminders.map((reminder)=>(

                        <div
                            key={reminder.id}
                            className="border-b py-3"
                        >

                            <h3 className="font-semibold">
                                {reminder.title}
                            </h3>


                            <p className="text-sm text-gray-500">

                                {reminder.reminderDate}

                            </p>


                        </div>

                    ))

                )

            }


        </div>

    );

}


export default UpcomingReminders;