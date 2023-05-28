import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthContextProvider from './Context/AuthContext'
import WorkoutContextProvider from './Context/WorkoutContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <AuthContextProvider >
  <WorkoutContextProvider>
  <App />
  </WorkoutContextProvider>
  </AuthContextProvider>
</React.StrictMode> );
  

