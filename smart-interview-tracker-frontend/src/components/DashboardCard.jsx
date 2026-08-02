function DashboardCard({title,value}) {

    return (

        <div className="
        bg-white
        dark:bg-gray-800
        shadow
        rounded-xl
        p-5
        text-gray-900
        dark:text-white
        ">

            <h3 className="text-gray-500 text-sm">
                {title}
            </h3>


            <p className="text-3xl font-bold mt-2">
                {value}
            </p>


        </div>

    );

}

export default DashboardCard;