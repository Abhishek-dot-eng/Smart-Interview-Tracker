import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Interviews from "./pages/Interviews";
import PublicRoute from "./components/PublicRoute";
import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


function App(){

return(




<Routes>


<Route
    path="/login"
    element={
        <PublicRoute>
            <Login />
        </PublicRoute>
    }
/>


<Route
    path="/register"
    element={
        <PublicRoute>
            <Register />
        </PublicRoute>
    }
/>

<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/interviews"
    element={
        <ProtectedRoute>
            <Interviews />
        </ProtectedRoute>
    }
/>

</Routes>




)

}


export default App;