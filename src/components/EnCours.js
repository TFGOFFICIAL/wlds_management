import React, { useEffect, useState } from 'react'
import { db } from './../firebase'
import { collection, query, onSnapshot, deleteDoc, doc, where, updateDoc } from 'firebase/firestore'

export default function EnCours() {
  const [contacts, setContacts] = useState([]);

  const updateUp = async (id) => {
    const docRef = doc(db, "contact", id);
    await updateDoc(docRef, {
        treated: 2
      });
  }

  const updateDown = async (id) => {
    const docRef = doc(db, "contact", id);
    await updateDoc(docRef, {
        treated: 0
      });
  }

  const handleDelete = async (id) => {
    const docRef = doc(db, "contact", id);

    deleteDoc(docRef);
  }

  useEffect(() => {
    const q = query(collection(db, 'contact'), where("treated", "==", 1));
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
                <div key={i} className='flex flex-col my-10 items-center lg:w-[1100px] bg-white shadow-xl rounded-xl px-5'>
                    <div className='my-5 mx-5 flex flex-row w-full justify-between text-[0.6rem]'>
                        <div>id case: {c.id}</div>
                        <div className='flex flex-row gap-2'>
                            <button onClick={() => {updateDown(c.id);}} disabled={false} className='border-2 border-black p-1 rounded-lg hover:shadow-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                                    <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                </svg>
                            </button>
                            <button onClick={() => {updateUp(c.id);}} disabled={false} className='border-2 border-black p-1 rounded-lg hover:shadow-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='my-10 title'>{c.firstname } {c.lastname}</div>
                    <div className='font-semibold text-[1.2rem] w-full'>Email:</div>
                    <div className='mb-5 w-full'>{c.email}</div>
                    <div className='font-semibold text-[1.2rem] w-full'>Message:</div>
                    <div className='w-full mb-5'>{c.message}</div>
                    <div className='flex flex-row w-full justify-end'>
                        <button onClick={() => {handleDelete(c.id);}} className='mb-5 p-2 bg-gradient-to-r from-red-800 to-red-600 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )
        })
        :
        <div className='mt-20 title text-gray-500'>Aucune demande est en cours de traitement.</div>}
    </div>
  )
}