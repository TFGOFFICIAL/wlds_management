import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileNav from './ProfileNav'

export default function Profile() {
  return (
    <div className='w-full'>
        <ProfileNav />
        <Outlet />
    </div>
  )
}
