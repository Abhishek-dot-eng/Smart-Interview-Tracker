import { useEffect, useState } from "react";
import API from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function Dashboard(){

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    const [dashboardData,setDashboardData] = useState(null);


    useEffect(()=>{

        const fetchDashboard = async()=>{

            try{

                const response = await API.get("/dashboard");

                setDashboardData(response.data);

            }
            catch(error){

                console.log(error);

            }

        };


        fetchDashboard();


    },[]);



    if(!dashboardData){

        return (
            <h1 className="text-2xl p-6">
                Loading Dashboard...
            </h1>
        )

    }



    return (
    <>
        <Navbar />

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>

            <div className="grid grid-cols-3 gap-5">

                <div className="border p-5 rounded">
                    <h2 className="font-bold">Total Interviews</h2>
                    <p className="text-2xl">
                        {dashboardData.totalInterviews}
                    </p>
                </div>

                <div className="border p-5 rounded">
                    <h2 className="font-bold">Upcoming</h2>
                    <p className="text-2xl">
                        {dashboardData.upcoming}
                    </p>
                </div>

                <div className="border p-5 rounded">
                    <h2 className="font-bold">Completed</h2>
                    <p className="text-2xl">
                        {dashboardData.completed}
                    </p>
                </div>

            </div>

        </div>
    </>
    );

}


export default Dashboard;