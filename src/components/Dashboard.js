import React from 'react'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    }catch(e) {}
  }
  return (
    <div>
        <div>Current user email : {user?.email}</div>
        {user && <button className='border p-1' onClick={handleLogout}>Logout</button>}     
    </div>
  )
}
