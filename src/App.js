import React from 'react'
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './context/AuthContext'

export default function App() {
  return (
    <div className='h-full'>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={ <SignIn/> } />
            <Route path='/dashboard' element={ <ProtectedRoute><Dashboard/></ProtectedRoute> } />
          </Routes>
        </AuthContextProvider>  
      </Router>      
    </div>
  )
}
