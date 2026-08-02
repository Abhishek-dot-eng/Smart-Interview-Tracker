import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


function InterviewStatusChart({ data }) {


    const isDark =
        document.documentElement.classList.contains("dark");


    return (

        <div className="
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow-md
            p-4
            md:p-6
            w-full
            overflow-hidden
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
                Interview Status Overview
            </h2>


            <div className="w-full h-[300px]">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>


                        <Pie

                            data={data}

                            dataKey="value"

                            nameKey="name"

                            cx="50%"

                            cy="50%"

                            outerRadius={90}

                            label

                        >

                            {
                                data.map((entry,index)=>(

                                    <Cell key={index}/>

                                ))
                            }


                        </Pie>


                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                                borderRadius: "8px",
                                border: "none",
                                color: isDark ? "#ffffff" : "#000000"
                            }}
                        />


                        <Legend
                            wrapperStyle={{
                                color: isDark ? "#ffffff" : "#000000"
                            }}
                        />


                    </PieChart>

                </ResponsiveContainer>

            </div>


        </div>

    );

}


export default InterviewStatusChart;