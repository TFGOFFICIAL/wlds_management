import React from 'react';
import Contact from './Contact';
import Nav from './Nav';

export default function Dashboard() {
  return (
    <div className='flex flex-col w-full'>
      <Nav />
      <div className='flex flex-col lg:items-center'>
          <Contact />
      </div>
    </div>
  )
}
