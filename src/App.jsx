import { useContext } from 'react';
import {Route,Routes,BrowserRouter,Navigate} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import { AuthContext } from './Context/AuthContext';
function App() {
const {user} = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
     <Routes>
    <Route path = '/' element = {user ? <Home /> : <Navigate to = '/login' /> } />
    <Route path = '/login' element = {!user ? <Login /> : <Navigate to = '/' />} />
    <Route path = '/signup' element = {!user ? <Signup /> : <Navigate to = '/' />} />
     </Routes>
     </div>
     </BrowserRouter>
    </div>
  )
}

export default App
