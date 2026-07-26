import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Interviews from "./pages/Interviews";
import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


function App(){

return(

<BrowserRouter>


<Routes>


<Route 
path="/login"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
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


</BrowserRouter>

)

}


export default App;