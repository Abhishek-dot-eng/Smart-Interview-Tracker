import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex gap-6 p-4 bg-gray-800 text-white">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/interviews">Interviews</Link>
        </nav>
    );
}

export default Navbar;