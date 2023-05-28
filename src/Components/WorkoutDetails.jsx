import {MdDeleteForever} from 'react-icons/md'
import formatDistanceToNow from'date-fns/formatDistanceToNow'
import {format} from 'date-fns'
import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react'
import { WorkoutContext } from '../Context/WorkoutContext';
export default function WorkoutDetails({workout}){
    const {user} = useContext(AuthContext);
    const {dispatch}  = useContext(WorkoutContext);
    const handleClick = async function(){
        if(!user){
            return 
        }
        const response = await fetch('https://workoutsbackend.onrender.com/api/workout/'+workout._id,{
            method : 'DELETE',
            headers : {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if(response.ok){
        dispatch({type:'DELETE_WORKOUT',payload:workout._id}); }
    }
    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            {/* <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix : true})} </p> */}
            <span onClick={handleClick}><MdDeleteForever /></span>
        </div>
    )
}