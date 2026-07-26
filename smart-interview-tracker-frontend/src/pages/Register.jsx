import {useState} from "react";
import API from "../api/axios";


function Register(){


const [user,setUser]=useState({
name:"",
email:"",
password:""
});


const register=async(e)=>{

e.preventDefault();


await API.post(
"/auth/register",
user
);


alert("Registered Successfully");


}


return(

<form onSubmit={register}>


<input
placeholder="Name"
onChange={
e=>setUser({...user,name:e.target.value})
}
/>


<input
placeholder="Email"
onChange={
e=>setUser({...user,email:e.target.value})
}
/>


<input
type="password"
placeholder="Password"
onChange={
e=>setUser({...user,password:e.target.value})
}
/>


<button>
Register
</button>


</form>

)


}


export default Register;