import {useState,useContext} from "react";
import API from "../api/axios";
import {AuthContext} from "../auth/AuthContext";
import {useNavigate} from "react-router-dom";


function Login(){


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const {login}=useContext(AuthContext);

const navigate=useNavigate();



const handleLogin=async(e)=>{

e.preventDefault();


try{

const response = await API.post(
"/auth/login",
{
email,
password
}
);


login(response.data.token);


navigate("/dashboard");


}
catch(error){

console.log(error);

alert("Login failed");

}


}



return (

<div className="flex justify-center items-center h-screen">


<form
onSubmit={handleLogin}
className="space-y-4"
>


<h1 className="text-3xl font-bold">
Login
</h1>


<input
className="border p-2"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="border p-2"
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button
className="bg-blue-600 text-white px-4 py-2"
>

Login

</button>


</form>


</div>

)


}


export default Login;