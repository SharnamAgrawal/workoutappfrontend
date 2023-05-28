import { useContext } from "react"
import { NavLink,Link  } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
export default function Navbar(){
    const {user,dispatch} = useContext(AuthContext);
    const logout = ()=>{
    
      dispatch({type:'LOGOUT',payload:null})
      localStorage.removeItem('user');
    }
    return(
        <header>
            <div className="container">
             <NavLink to = '/'><h1>WorkoutBuddy</h1></NavLink>
            </div>
                <div className="sha" id = {!(user===null)? "notnull" : "null"}>
                   <nav>
                 {!(user==null)? <><div><span  style = {{color:"#1aac83", fontWeight:'600'}}>Welcome</span> {user.email}</div> <div className="logout" onClick={logout} >LOGOUT</div></> :  <><div className="link"><Link to='/login'>Log In</Link></div><div className="link"><Link to='/signup'>Sign Up</Link></div></>}
                   
                </nav> 
               
                </div>
        </header>
    )
}