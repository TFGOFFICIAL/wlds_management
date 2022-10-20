import React from 'react'
import Nav from './Nav'
import Notifie from './Notifie'

export default function Newsletter() {
  return (
    <div className='flex flex-col w-full'>
      <Nav />
      <div className='flex flex-col lg:items-center'>
        <Notifie />
      </div>
    </div>
  )
}
