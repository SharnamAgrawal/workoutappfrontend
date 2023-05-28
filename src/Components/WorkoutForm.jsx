import { useState,useContext } from "react"
import { WorkoutContext } from "../Context/WorkoutContext";
import { AuthContext } from "../Context/AuthContext";
export default function WorkoutForm(){
    const {dispatch} = useContext(WorkoutContext);
    const [title,setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps,setReps] = useState('');
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [empField,setField] = useState(['hello',]);
    const {user} = useContext(AuthContext);
    console.log(user.token);
    const handleSubmit = async function(e){
        e.preventDefault();
        if(!user){
            return
        }
        setIsLoading(true);
        const sendData = {title,load,reps};
        try{
            console.log(sendData)
        const response  = await fetch('https://workoutsbackend.onrender.com/api/workout', {
            method : 'POST',
            body : JSON.stringify(sendData),
            headers :{
                'Content-Type' : 'application/json',
                'Authorization' :  `Bearer ${user.token}`
            }
        })
        // console.log(response);
        const json = await response.json();
        console.log(json);
        console.log(json.emptyField);
        if(!response.ok){
            setError(json.message);
            setIsLoading(false);
            setField(['hello'])
           setField(x=>([...x,...json.emptyField]))
            console.log('Marja kutte');
            console.log(empField);
           }else{
            console.log('ok did')
            setIsLoading(false);
               setError(null);
               console.log('new workout added',json);
               dispatch({type : 'CREATE_WORKOUT', payload : sendData});
               setTitle(''); setLoad(''); setReps(''); 
               setField(['hello']);
           }}catch(e){
            setError(e.message);
            console.log(error);
        }
      
     
    }
     
    return(
     <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Exercise Title:</label>
        <input type = 'text'  value = {title} className = {((!(error===null)) && empField.includes('title'))? 'error' : ''} onChange={(e)=>setTitle(e.target.value)} />
        <label>Load (in kg):</label>
        <input type = 'text' value = {load}  className = {((!(error===null)) && empField.includes('load'))? 'error' : ''} onChange={(e)=>setLoad(e.target.value)} /> 
        <label>Reps:</label>
        <input type = 'text'  className = {((!(error===null)) && empField.includes('reps'))? 'error' : ''} value = {reps} onChange={(e)=>setReps(e.target.value)}/>
        <button disabled = {isLoading} onSubmit={(e)=>{handleSubmit(e)}}>Add Workout</button>
        {error && <div className="error">{error}</div>}
     </form>
    )
}