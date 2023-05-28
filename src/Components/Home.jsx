import { useState,useEffect,useContext } from "react"
import WorkoutDetails from "./WorkoutDetails"
import WorkoutForm from "./WorkoutForm";
import { WorkoutContext } from "../Context/WorkoutContext";
import { AuthContext } from "../Context/AuthContext";
export default function Home(){
    const {workouts,dispatch} = useContext(WorkoutContext);
    const {user} = useContext(AuthContext);
    useEffect(()=>{
        const fetchWorkout = async function(){
            try{
         const ponse = await fetch('https://workoutsbackend.onrender.com/api/workout',{
            headers :{
                'Authorization' : `Bearer ${user.token}`
            }
         });
        const res = await ponse.json();
         if(ponse.ok){
            dispatch({type : 'SET_WORKOUT',payload:res})
         }}catch(e){
            console.log(e.message);
         }
        } 
        if(user){
        fetchWorkout()}
    }, [dispatch,user]);
    return(
        <div className="home">
        <div className="workout">
        {workouts && workouts.map((workout)=>{
            console.log(workout.createdAt)
            return <WorkoutDetails key = {workout?._id} workout = {workout} />
        })}
        </div>
        <WorkoutForm />
        </div>
    )
}