import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import { collection, query, onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Nav from './Nav'

export default function AddVideo() {
    const [videos, setTemplates] = useState([]);
    const [formKey, setFormkey] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [youtube, setYoutube] = useState("");
    const [github, setGithub] = useState("");
    const [pp, setPp] = useState(null);
    const [ppName, setPpName] = useState("");
    const [ppURL, setPpUrl] = useState("");

    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
  
    const resetForm = () => {
        setTitle("");
        setAuthor("");
        setDescription("");
        setYoutube("");
        setGithub("");
        setPp(null);
        setPpName("");
        setPpUrl("");
        setFormkey(formKey + 1);
    }

    const handlePpChange = (e) => {
        if(e.target.files[0]) {
          setPp(e.target.files[0]);
          setPpName(e.target.files[0].name);
        }
    }
    
    const handlePpValidate = () => {
        const imgRef = ref(storage, `videos/${ppName}`);
        uploadBytes(imgRef, pp)
            .then(() => {
            getDownloadURL(imgRef)
            .then((l) => {
                setPpUrl(l);
            })
            .catch((err) => {});
            setPp(null);
            })
            .catch((er) => {});
    }

    const handleDelete = async (id) => {
        const docRef = doc(db, "videos", id);
    
        deleteDoc(docRef);
      }
  
    const createVideo = async (titre, auteur, desc, ytb, git, imgLink) => {
      const videoRef = collection(db, "videos");
      setError("");
      setShowError(false);
      if(titre !== "" && auteur !== "" && desc !== "" && ytb !== "" && imgLink !== "" && git !== ""){
        await addDoc(videoRef, {title: titre, author: auteur, description: desc, youtube: ytb, github: git, image: imgLink});
        resetForm();        
      }else if (titre !== "" && auteur !== "" && desc !== "" && ytb !== "" && imgLink !== "" && git === ""){
        await addDoc(videoRef, {title: titre, author: auteur, description: desc, youtube: ytb, image: imgLink});
        resetForm();
      }else {
        setError("Required field aren't complited");
        setShowError(true);
        setTimeout(function() { setShowError(false); }, 3000);
      }   
    };

    useEffect(() => {
        const q = query(collection(db, 'videos'));
        onSnapshot(q, (querySnapshot) => {
            const datas = []
            querySnapshot.forEach((doc) => {
                datas.push({id: doc.id, ...doc.data()}); 
            });
            setTemplates(datas);
        });
    }, [])
  return (
    <div className='flex flex-col w-full'>
      <Nav />
      {
        showError ?
            <div className='w-[1100px] p-5 bg-red-500 shadow-xl rounded-xl mx-auto mt-5 text-white text-2xl flex flex-col items-center'>{error}</div>
        :
            null
      }
      <div className='flex flex-col lg:items-center mb-20'>
        <div key={formKey} className='w-[1100px] flex flex-col items-center gap-5 bg-white rounded-xl mt-10 p-10 shadow-xl'>
            <div className='w-full title text-2xl'>Title:</div>
            <input type='text' onChange={(e) => {setTitle(e.target.value);}} className='w-full p-2 border border-black rounded-xl' placeholder='React Website Tutorial - Beginner React JS Project Fully Responsive ...' />
            <div className='w-full title text-2xl'>Author:</div>
            <input type='text' onChange={(e) => {setAuthor(e.target.value);}} className='w-full p-2 border border-black rounded-xl' placeholder='Brian Design ...' />
            <div className='w-full title text-2xl'>Description:</div>
            <textarea onChange={(e) => {setDescription(e.target.value);}} className='w-full p-2 border border-black rounded-t-xl rounded-bl-xl' />
            <div className='w-full title text-2xl'>YouTube Link:</div>
            <input type='text' onChange={(e) => {setYoutube(e.target.value);}} className='w-full p-2 border border-black rounded-xl' placeholder='https://www.youtube.com/watch?v=I2UBjN5ER4s ...' />
            <div className='w-full title text-2xl'>GitHub Link:</div>
            <input type='text' onChange={(e) => {setGithub(e.target.value);}} className='w-full p-2 border border-black rounded-xl' placeholder='https://github.com/briancodex/react-website-v1 ...' />            
            <div className='w-full title text-2xl'>Video Picture:</div>
            <div className='flex flex-row w-full gap-10 justify-start'>
              {
                ppURL ? <img src={ppURL} alt='' className='w-60 rounded-md' /> : null
              }
              {
                !ppURL ?
                  <div className='flex flex-row'>
                    <input type="file" onChange={handlePpChange} className='p-2'/>
                    <button onClick={handlePpValidate} className=''>
                      <svg className='fill-green-500' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                      </svg>
                    </button>
                  </div>
                :
                  null
              }              
            </div>  
            <div className='w-full flex flex-row justify-end'>
                <button onClick={() => {createVideo(title, author, description, youtube, github, ppURL);}}>
                    <svg className='fill-green-500' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                    </svg>
                </button>
            </div>
        </div>
        {
            videos.map((t, i) => {
                return(
                    <div key={i} className='w-[1100px] flex flex-row items-center gap-5 bg-white rounded-xl mt-10 p-10 shadow-xl'>
                        <img src={t.image} alt='' className='rounded-xl shadow-xl w-60' />
                        <div className='flex flex-col w-full'>
                            <div className='flex flex-row justify-between gap-5 w-full'>
                                <div className='title text-xl my-auto'>{t.title}</div>
                                <button onClick={() => {handleDelete(t.id);}}>
                                    <svg className='fill-red-500' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                    </svg>
                                </button>
                            </div>                            
                            <div className='my-2'>Author: {t.author}</div>
                            <div>{t.description}</div>
                            <div className='flex flex-row gap-5 mt-5'>
                                <a target='blank' href={t.youtube} className='p-1 rounded-full bg-gray-300 hover:bg-gray-500 hover:shadow-xl transition-all duration-500'>
                                    <svg className='fill-black hover:fill-white transition-all duration-500' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                                    </svg>
                                </a>
                                {
                                t.github ? 
                                    <a target='blank' href={t.github} className='p-1 rounded-full bg-gray-300 hover:bg-gray-500 hover:shadow-xl transition-all duration-500'>
                                        <svg className='fill-black hover:fill-white transition-all duration-500' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                        </svg>
                                    </a>
                                : 
                                    null
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}
