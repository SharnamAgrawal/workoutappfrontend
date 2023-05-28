import {useState,createContext,useReducer} from 'react';
export const WorkoutContext = createContext();
export const workoutsReducer = (state,action)=>{
    switch(action.type){
        case 'SET_WORKOUT':
        return {workouts : action.payload}
        case 'CREATE_WORKOUT':
        return {workouts : [...state.workouts,action.payload]}
        case 'DELETE_WORKOUT':
        return {workouts : state.workouts.filter((workout)=>workout._id!=action.payload)}
        default :
        return {workouts : state.workouts!==null ? [...state.workouts] : []}
    }
}
export default function WorkoutContextProvider(props){
    const [state,dispatch] = useReducer(workoutsReducer,{workouts : []});
    return(
        <WorkoutContext.Provider value ={{...state,dispatch}}>
             {props.children}
        </WorkoutContext.Provider>
    )

}