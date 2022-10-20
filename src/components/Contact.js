import React, { useEffect, useState } from 'react'
import { db } from './../firebase'
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore'

export default function Contact() {
  const [contacts, setContacts] = useState([]);

  const handleDelete = async (id) => {
    const docRef = doc(db, "contact", id);

    deleteDoc(docRef);
  }

  useEffect(() => {
    const q = query(collection(db, 'contact'));
    onSnapshot(q, (querySnapshot) => {
        const datas = []
        querySnapshot.forEach((doc) => {
            datas.push({id: doc.id, ...doc.data()}); 
        });
        setContacts(datas);
    });
  }, [])
  return (
    <div className='flex flex-col'>
        {contacts.length > 0 ? contacts.map((c, i) => {
            return (
                <div key={i} className='flex flex-col my-10 items-center lg:w-[400px] bg-white shadow-xl rounded-xl px-5'>
                    <div className='my-5 ml-5 flex flex-row w-full justify-start text-[0.6rem]'>{c.id}</div>
                    <div className='mb-5'>{c.firstname } {c.lastname}</div>
                    <div className='mb-5'>{c.email}</div>
                    <div className='flex flex-row w-full justify-end'>
                        <button onClick={() => {handleDelete(c.id);}} className='mr-5 mb-5 p-2 bg-gradient-to-r from-red-800 to-red-600 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )
        })
        :
        <div className='mt-20 title text-gray-500'>Aucune personne ne vous a contacté.</div>}
    </div>
  )
}
