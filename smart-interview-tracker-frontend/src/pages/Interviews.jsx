import { useEffect, useState, useRef } from "react";
import {
    getAllInterviews,
    createInterview,
    deleteInterview,
    updateInterview,
    searchInterviews
} from "../api/interviewApi";
import Navbar from "../components/Navbar";
import InterviewForm from "../components/InterviewForm";
import Reminder from "../components/Reminder";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import InterviewCard from "../components/InterviewCard";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useLoading from "../hooks/useLoading";
import getErrorMessage from "../utils/getErrorMessage";

function Interviews() {

    const [interviews, setInterviews] = useState([]);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const formRef = useRef(null);
    // const [company, setCompany] = useState("");
    // const [role, setRole] = useState("");
    // const [status, setStatus] = useState("");
    // const [from, setFrom] = useState("");
    // const [to, setTo] = useState("");
    // const [upcoming, setUpcoming] = useState(false);
    const {
        loading,
        startLoading,
        stopLoading
    } = useLoading(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const interviewsPerPage = 5;

    useEffect(()=>{

        setCurrentPage(1);

    },[searchTerm,statusFilter,sortOrder]);

    useEffect(() => {
        loadInterviews();
    }, []);

    const loadInterviews = async () => {

    try {

        startLoading();
        setError("");

        const response = await getAllInterviews();

        setInterviews(response.data);

    } catch(error) {

        console.error(error);
        toast.error(getErrorMessage(error));

    } finally {

        stopLoading();

    }
    };

    const handleAddInterview = async (interviewData) => {
        try {
            await createInterview(interviewData);
            toast.success("Interview added successfully");

            // Reload the list after adding
            loadInterviews();

        } catch (error) {
            console.log(error);
            toast.error("Failed to add interview");
        }
        };

        const handleDeleteInterview = async (id) => {

        const result = await Swal.fire({
            title: "Delete Interview?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            await deleteInterview(id);

            toast.success("Interview deleted successfully");

            loadInterviews();

        } catch(error){

            console.log(error);

            toast.error("Failed to delete interview");

        }

    };

    const handleUpdateInterview = async(id,data)=>{

    try{

        await updateInterview(id,data);

        toast.success("Interview updated successfully");

        setSelectedInterview(null);

        loadInterviews();

    }
    catch(error){

        console.log(error);

        toast.error("Failed to update interview");

    }

    };

    const handleSearch = async () => {

    try {

        setLoading(true);

        const response = await searchInterviews({
            company,
            role,
            status,
            from,
            to,
            upcoming
        });

        setInterviews(response.data);

    } catch(error) {

        console.error("Search failed:", error);

    } finally {

        setLoading(false);

    }
    };

    const handleReset = async () => {

    setCompany("");
    setRole("");
    setStatus("");
    setFrom("");
    setTo("");
    setUpcoming(false);

    await loadInterviews();

    };

    const filteredInterviews = interviews
        .filter((interview)=>{

            const matchesSearch =
                interview.company
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
                ||
                interview.role
                .toLowerCase()
                .includes(searchTerm.toLowerCase());


            const matchesStatus =
                statusFilter === ""
                ||
                interview.status === statusFilter;


            return matchesSearch && matchesStatus;

        })
        .sort((a,b)=>{


            const dateA = new Date(a.interviewDate);
            const dateB = new Date(b.interviewDate);


            if(sortOrder === "newest"){
                return dateB - dateA;
            }
            else{
                return dateA - dateB;
            }

    });

    const indexOfLastInterview =
        currentPage * interviewsPerPage;


    const indexOfFirstInterview =
        indexOfLastInterview - interviewsPerPage;


    const currentInterviews =
        filteredInterviews.slice(
            indexOfFirstInterview,
            indexOfLastInterview
        );


    const totalPages =
        Math.ceil(
            filteredInterviews.length /
            interviewsPerPage
        );

    const handleEditInterview = (interview) => {

        setSelectedInterview(interview);

        setTimeout(() => {

            formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    };

    if (loading) return <Loader />;

    if (error) return <ErrorMessage message={error} />;

    

    return (
    <>
        <Navbar />
        <div className="
            p-6
            min-h-screen
            bg-gray-50
            dark:bg-gray-950
            text-gray-900
            dark:text-white
        ">

            <InterviewForm
                ref={formRef}
                onAddInterview={handleAddInterview}
                selectedInterview={selectedInterview}
                onUpdateInterview={handleUpdateInterview}
            />

            <h1 className="
                text-3xl
                font-bold
                mb-6
                text-gray-900
                dark:text-white
            ">
                Interviews
            </h1>


            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search company or role..."
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    className="
                        border
                        rounded-lg
                        p-2
                        flex-1
                        bg-white
                        dark:bg-gray-800
                        dark:border-gray-700
                        text-gray-900
                        dark:text-white
                        placeholder-gray-500
                    "
                />


                <select
                    value={statusFilter}
                    onChange={(e)=>setStatusFilter(e.target.value)}
                    className="
                        border
                        rounded-lg
                        p-2
                        bg-white
                        dark:bg-gray-800
                        dark:border-gray-700
                        text-gray-900
                        dark:text-white
                    "
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="Applied">
                        Applied
                    </option>

                    <option value="Scheduled">
                        Scheduled
                    </option>

                    <option value="Offer">
                        Offer
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                    <option value="Rejected">
                        Rejected
                    </option>

                </select>

                <select
                    value={sortOrder}
                    onChange={(e)=>setSortOrder(e.target.value)}
                    className="
                        border
                        rounded-lg
                        p-2
                        bg-white
                        dark:bg-gray-800
                        dark:border-gray-700
                        text-gray-900
                        dark:text-white
                    "
                >

                    <option value="newest">
                        Newest First
                    </option>

                    <option value="oldest">
                        Oldest First
                    </option>

                </select>

            </div>


            <p className="
                text-gray-600
                dark:text-gray-400
                mb-3
            ">
                Total Interviews: {interviews.length}
            </p>

            

            
    {
        currentInterviews.length === 0 ? (

            <EmptyState
                icon="📂"
                title="No interviews found"
                message="Start by adding your first interview."
            />

        ) : (

            currentInterviews.map((interview)=>(

                <InterviewCard

                    key={interview.id}

                    interview={interview}

                    selectedInterview={
                        selectedInterview
                    }

                    setSelectedInterview={
                        handleEditInterview
                    }

                    onDelete={
                        handleDeleteInterview
                    }

                />

            ))

        )
    }

        <div className="flex justify-center gap-4 mt-6">


        <button

            disabled={currentPage === 1}

            onClick={()=>
                setCurrentPage(currentPage - 1)
            }

            className="
                bg-gray-500
                dark:bg-gray-700
                text-white
                px-4
                py-2
                rounded
                disabled:opacity-50
            "

        >
            Previous
        </button>



        <span className="
            px-4
            py-2
            text-gray-900
            dark:text-white
        ">

            Page {currentPage} of {totalPages || 1}

        </span>



        <button

            disabled={currentPage === totalPages}

            onClick={()=>
                setCurrentPage(currentPage + 1)
            }

            className="
                bg-blue-600
                dark:bg-blue-700
                text-white
                px-4
                py-2
                rounded
                disabled:opacity-50
            "

        >
            Next
        </button>


        </div>

        </div>
        </>
    );

}

export default Interviews;