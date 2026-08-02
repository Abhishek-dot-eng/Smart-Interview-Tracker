import { useEffect, useState } from "react";
import API from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getDashboard } from "../services/dashboardService";
import StatCard from "../components/StatCard";
import UpcomingReminders from "../components/UpcomingReminders";
import RecentInterviews from "../components/RecentInterviews";
import DashboardCard from "../components/DashboardCard";
import InterviewStatusChart from "../components/InterviewStatusChart";
import {
    getUpcomingReminders,
    getRecentInterviews
} from "../api/dashboardApi";
import useLoading from "../hooks/useLoading";
import getErrorMessage from "../utils/getErrorMessage";


function Dashboard(){

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    const [dashboardData,setDashboardData] = useState(null);
    const [upcomingReminders, setUpcomingReminders] = useState([]);
    const [error, setError] = useState("");
    const [reminders,setReminders] = useState([]);
    const [recentInterviews, setRecentInterviews] = useState([]);
    const {
        loading,
        startLoading,
        stopLoading
    } = useLoading(true);

    const chartData = [
        {
            name: "Applied",
            value: dashboardData?.applied || 0,
        },
        {
            name: "Scheduled",
            value: dashboardData?.scheduled || 0,
        },
        {
            name: "Completed",
            value: dashboardData?.completed || 0,
        },
        {
            name: "Offer",
            value: dashboardData?.offers || 0,
        },
        {
            name: "Rejected",
            value: dashboardData?.rejected || 0,
        },
    ];
    

        const fetchDashboard = async () => {
            try {
                startLoading();
                setError("");

                const response = await getDashboard();
                setDashboardData(response.data);

            } catch (error) {

                console.error(error);

                toast.error(getErrorMessage(error));
            } finally {
                stopLoading();
            }
        };

        const fetchUpcomingReminders = async()=>{

            try{

                const response =
                    await getUpcomingReminders();


                setReminders(response.data);


            }
            catch(error){

                console.log(error);

            }

        };



        const fetchRecentInterviews = async()=>{

            try{

                const response =
                    await getRecentInterviews();


                setRecentInterviews(response.data);


            }
            catch(error){

                console.log(error);

            }

        };


    useEffect(()=>{


        fetchDashboard();

        fetchUpcomingReminders();

        fetchRecentInterviews();


    },[]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

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

    <div className="
        w-full 
        overflow-x-hidden 
        p-4 
        md:p-6
        bg-gray-50
        dark:bg-gray-950
        min-h-screen
        text-gray-900
        dark:text-white
    ">


    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

        <h1 className="
            text-3xl 
            font-bold
            text-gray-900
            dark:text-white
        ">
            Dashboard
        </h1>

        <button
            onClick={handleLogout}
            className="
            bg-red-500 
            text-white 
            px-4 
            py-2 
            rounded-lg 
            hover:bg-red-600
            dark:hover:bg-red-700
            transition
            "
        >
            Logout
        </button>

    </div>



    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">


    <DashboardCard

        title="Total Applications"

        value={
            dashboardData.totalApplications || 0
        }

    />


    <DashboardCard

        title="Interviews"

       value={
        dashboardData.scheduled || 0
       }

    />



    <DashboardCard

        title="Offers"

        value={
            dashboardData.offers || 0
        }

    />



    <DashboardCard

        title="Rejected"

        value={
            dashboardData.rejected || 0
        }

    />



    <DashboardCard

        title="Pending"

        value={
            dashboardData.pending || 0
        }

    />


    </div>

    <div className="
    mt-8 
    w-full 
    overflow-hidden
    bg-white
    dark:bg-gray-800
    rounded-xl
    p-4
    ">

        <InterviewStatusChart 
            data={chartData}
        />

    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-8">


        <UpcomingReminders
            reminders={reminders}
        />


        <RecentInterviews
            interviews={recentInterviews}
        />


    </div>


    </div>


    </>

    );

}


export default Dashboard;