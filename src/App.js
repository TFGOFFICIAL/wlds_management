import React from 'react'
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './context/AuthContext'
import Newsletter from './components/Newsletter'
import AddTemplate from './components/AddTemplate'
import AddVideo from './components/AddVideo'

export default function App() {
  return (
    <div className='h-full font-roboto'>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={ <SignIn/> } />
            <Route path='/dashboard/:page' element={ <ProtectedRoute><Dashboard/></ProtectedRoute> } />
            <Route path='/newsletter' element={ <ProtectedRoute><Newsletter/></ProtectedRoute> } />
            <Route path='/addtemplates' element={ <ProtectedRoute><AddTemplate/></ProtectedRoute> } />
            <Route path='/addvideos' element={ <ProtectedRoute><AddVideo/></ProtectedRoute> } />
          </Routes>
        </AuthContextProvider>  
      </Router>      
    </div>
  )
}
