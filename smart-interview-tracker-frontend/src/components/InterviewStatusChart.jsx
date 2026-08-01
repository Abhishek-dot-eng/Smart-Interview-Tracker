import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


function InterviewStatusChart({data}) {


    return (

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 w-full overflow-hidden">

            <h2 className="text-xl font-semibold mb-4">
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


                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>


        </div>

    );

}


export default InterviewStatusChart;