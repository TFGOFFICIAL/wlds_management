import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

export default function Dashboard() {
  return (
    <div className='flex flex-col w-full'>
      <Nav />
      <div className='flex flex-col lg:items-center'>
        <Outlet />
      </div>
    </div>
  )
}
