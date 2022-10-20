import React, { useEffect, useState } from 'react'
import { db } from './../firebase'
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore'

export default function Notifie() {
  const [mails, setMails] = useState([]);

  const handleDelete = async (id) => {
    const docRef = doc(db, "mails", id);

    deleteDoc(docRef);
  }

  useEffect(() => {
    const q = query(collection(db, 'mails'));
    onSnapshot(q, (querySnapshot) => {
        const datas = []
        querySnapshot.forEach((doc) => {
            datas.push({id: doc.id, ...doc.data()}); 
        });
        setMails(datas);
    });
  }, [])
  return (
    <div className='flex flex-col'>
        {mails.length > 0 ? mails.map((m, i) => {
            return (
                <div key={i} className='flex flex-row mt-10 items-center justify-between px-5 py-5 lg:w-[400px] bg-white shadow-xl rounded-xl'>
                    <div className=''>{m.mail}</div>
                    <button onClick={() => {handleDelete(m.id);}} className='p-2 bg-gradient-to-r from-red-800 to-red-600 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
            )
        })
        :
        <div className='mt-20 title text-gray-500'>Aucune personne n'a rejoint la newsletter.</div>}
    </div>
  )
}
