function UpcomingReminders({ reminders }) {


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
                Upcoming Reminders
            </h2>


            {
                reminders.length === 0 ? (

                    <p className="
                        text-gray-500
                        dark:text-gray-400
                    ">
                        No upcoming reminders
                    </p>

                )
                :

                (

                    reminders.map((reminder)=>(

                        <div
                            key={reminder.id}
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
                                {reminder.title}
                            </h3>


                            <p className="
                                text-sm 
                                text-gray-500
                                dark:text-gray-400
                            ">

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