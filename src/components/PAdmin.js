import React, { useRef, useState } from 'react'
import { db, storage } from '../firebase'
import { UserAuth } from '../context/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc } from "firebase/firestore";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PAdmin() {
  const { user, singleDoc } = UserAuth();
  const [pp, setPp] = useState(null);
  const [ppName, setPpName] = useState("");
  const [ppURL, setPpUrl] = useState("");
  const [showValideImg, setShowValideImg] = useState(false);
  const hiddenFileInput = useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  }

  const resetForm = () => {
    setPp(null);
    setPpName("");
    setPpUrl("");
  }

  const handlePpChange = (e) => {
    if(e.target.files[0]) {
      setPp(e.target.files[0]);
      setPpName(e.target.files[0].name);
    }
    setShowValideImg(true);
  }

  const handlePpValidate = () => {
    const imgRef = ref(storage, `users/${ppName}`);
    const docRef = doc(db, "users", user.uid);
    uploadBytes(imgRef, pp)
        .then(() => {
            getDownloadURL(imgRef)
                .then((l) => {
                    setPpUrl(l);
                    updateDoc(docRef, {pp: l})
                        .then(docRef => {
                            resetForm();
                        })
                        .catch(error => {
                            
                        })
                })
                .catch((err) => {});
            setPp(null);
        })
        .catch((er) => {});
    setShowValideImg(false);
  }

  return (
    <div className='w-full flex flex-col items-center py-20'>
        <div className='w-[900px] bg-white p-10 rounded-md shadow-lg flex flex-col'>
            <div className='flex flex-row w-full justify-around items-center'>
                <div className='flex flex-row items-end'>
                    <button onClick={handleClick}>
                        <img alt='' className='w-40 h-40 rounded-full border border-black' src={singleDoc.pp} />                        
                    </button>                            
                    <input type="file" ref={hiddenFileInput} onChange={handlePpChange} className='hidden'/>
                    <button onClick={handlePpValidate} className={classNames(showValideImg ? 'flex' : 'hidden')}>
                        <svg className='fill-green-500 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                    </button>
                </div>
                <div className='flex flex-col'>
                    <div className='title text-2xl'>
                        {singleDoc.firstname} {singleDoc.lastname}
                    </div>
                    <div className='font-semibold text-xl'>
                        {user.email}
                    </div>
                </div>
             </div>
             <div className='w-full flex flex-col py-20'>
                <div className='flex flex-row items-center gap-5'>
                    <div className='flex flex-row'>
                        {singleDoc.firstname} {singleDoc.lastname}
                    </div>
                    <button>
                        <svg className='fill-green-500 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </button>
                </div>
                <div className='flex flex-row items-center gap-5 mt-5'>
                    <div className='flex flex-row'>
                        {user.email}
                    </div>
                    <button>
                        <svg className='fill-green-500 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </button>
                </div>                
             </div>
        </div>
    </div>
  )
}
