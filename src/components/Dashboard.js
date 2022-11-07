import React from 'react';
import { useParams } from 'react-router-dom';
import Contact from './Contact';
import EnCours from './EnCours';
import Nav from './Nav';
import Traite from './Traite';

export default function Dashboard() {
  let { page } = useParams();
  return (
    <div className='flex flex-col w-full'>
      <Nav />
      <div className='flex flex-col lg:items-center'>
        {
          page === 'contact' ? <Contact />
          : page === 'encours' ? <EnCours />
          : page === 'traite' ? <Traite />
          : null
        }
      </div>
    </div>
  )
}
