import React from 'react'
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './context/AuthContext'
import Newsletter from './components/Newsletter'
import AddTemplate from './components/AddTemplate'
import AddVideo from './components/AddVideo'
import Contact from './components/Contact';
import EnCours from './components/EnCours';
import Traite from './components/Traite';
import Profile from './components/Profile'
import PAdmin from './components/PAdmin'

export default function App() {
  return (
    <div className='h-full font-roboto'>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={ <SignIn/> } />
            <Route path='/dashboard' element={ <ProtectedRoute><Dashboard/></ProtectedRoute> }>
              <Route path='contact' element={ <Contact /> } />
              <Route path='encours' element={ <EnCours /> } />
              <Route path='traite' element={ <Traite /> } />
            </Route>
            <Route path='/newsletter' element={ <ProtectedRoute><Newsletter/></ProtectedRoute> } />
            <Route path='/addtemplates' element={ <ProtectedRoute><AddTemplate/></ProtectedRoute> } />
            <Route path='/addvideos' element={ <ProtectedRoute><AddVideo/></ProtectedRoute> } />
            <Route path='/profile' element={ <ProtectedRoute><Profile /></ProtectedRoute> }>
              <Route path='admin@logic-web-design.com' element={ <PAdmin /> } />
            </Route>
          </Routes>
        </AuthContextProvider>  
      </Router>      
    </div>
  )
}
