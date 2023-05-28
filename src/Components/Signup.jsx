import { useState,useContext} from "react";
import { AuthContext } from "../Context/AuthContext";
const Signup = ()=>{
    const {dispatch} = useContext(AuthContext);
const [email,setEmail] = useState('');
const [password,SetPassword] = useState('');
const [error,setError] = useState(null);
const [isLoading,setIsLoading] = useState(false);
const handleSubmit = async function(e){
e.preventDefault();
setError(null);
setIsLoading(true);
try{
    const response = await fetch('https://workoutsbackend.onrender.com/api/user/signup',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({email,password})
    })
    const json = await response.json();
    if(!response.ok){
        setError(json.message);
        setIsLoading(false);
    }
    if(response.ok){
     setError(null); setIsLoading(false);
     dispatch({type : 'LOGIN',payload : json});
     localStorage.setItem('user',JSON.stringify(json));
    }
}catch(e){
   setError(e.message);
   console.log(e.message);
}

}
    return(
    <form className="signup" onSubmit = {handleSubmit}>
     <h3>Sign up</h3>
     <label>Email : </label>
     <input type='email' value = {email} onChange = {(e)=>setEmail(e.target.value)} />
     <label>Password : </label>
     <input type = 'password' value={password}
     onChange = {(e)=>SetPassword(e.target.value)} />
     <button disabled = {isLoading} type = 'submit'>Signup</button>
     {error && <div className="error">{error}</div>}
    </form>
    )
}
export default Signup;