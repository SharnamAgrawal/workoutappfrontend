import { useState,useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const Login = ()=>{
const [email,setEmail] = useState('');
const [password,SetPassword] = useState('');
const [error,setError] = useState(null);
const [isLoading,setIsLoading] = useState('');
const {dispatch} = useContext(AuthContext);
const handleSubmit = async function(e){
e.preventDefault();
setError(null);
setIsLoading(true);
try{
    const response = await fetch('https://workoutsbackend.onrender.com/api/user/login',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({email,password})
    })
    const json = await response.json();
    console.log(json);
    console.log(response)
    if(!response.ok){
        setIsLoading(false);
        setError(json.message);
    }
    if(response.ok){
        setIsLoading(false); setError(null);
        dispatch({type : 'LOGIN', payload : json});
        localStorage.setItem('user',JSON.stringify(json));
    }
}catch(e){
    setIsLoading(false);
setError(e.message);
}

}
    return(
    <form className="login" onSubmit = {handleSubmit}>
     <h3>Log In</h3>
     <label>Email : </label>
     <input type='email' value = {email} onChange = {(e)=>setEmail(e.target.value)} />
     <label>Password : </label>
     <input type = 'password' value={password}
     onChange = {(e)=>SetPassword(e.target.value)} />
     <button disabled = {isLoading} type = 'submit' onSubmit={(e)=>handleSubmit(e)}>Log In</button>
     {error && <div className="error">{error} </div>}
    </form>
    )
}
export default Login;