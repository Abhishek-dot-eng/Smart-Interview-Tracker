import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
    return (
        <nav className="
            flex 
            items-center 
            justify-between
            gap-6 
            p-4 
            bg-gray-800 
            dark:bg-gray-950
            text-white
        ">

            <div className="flex gap-6">
                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/interviews">
                    Interviews
                </Link>
            </div>


            <ThemeToggle />

        </nav>
    );
}

export default Navbar;