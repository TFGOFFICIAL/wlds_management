import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import { collection, query, onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Nav from './Nav'

export default function AddTemplate() {
  const [templates, setTemplates] = useState([]);
  const [formKey, setFormkey] = useState(0);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [pp, setPp] = useState(null);
  const [ppName, setPpName] = useState("");
  const [ppURL, setPpUrl] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imagesURLs, setImagesUrl] = useState([]);

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const resetForm = () => {
      setName("");
      setUrl("");
      setPp(null);
      setPpName("");
      setPpUrl("");
      setImage("");
      setImageName("");
      setImagesUrl("");
      setFormkey(formKey + 1);
  }

  const handleDelete = async (id) => {
    const docRef = doc(db, "templates", id);
    deleteDoc(docRef);
  }

  const handlePpChange = (e) => {
    if(e.target.files[0]) {
      setPp(e.target.files[0]);
      setPpName(e.target.files[0].name);
    }
  }

  const handlePpValidate = () => {
    const imgRef = ref(storage, `templates/${ppName}`);
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

  const handleImageChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  }

  const handleImageValidate = () => {
    const imgRef = ref(storage, `templates/${imageName}`);
    uploadBytes(imgRef, image)
      .then(() => {
        getDownloadURL(imgRef)
        .then((l) => {
          setImagesUrl(old => [...old, l]);
        })
        .catch((err) => {});
        setImage(null);
      })
      .catch((er) => {});
  }

  const createTemplate = async (name, link, pp, images) => {
    const templatesRef = collection(db, "templates");
    setError("");
    setShowError(false);
    if(name !== "" && link !== ""){
      await addDoc(templatesRef, {name: name, url: link, pp: pp, images: images});
      resetForm();
    }else {
      setError("Required field aren't complited");
      setShowError(true);
      setTimeout(function() { setShowError(false); }, 3000);
    }   
  };

  useEffect(() => {
      const q = query(collection(db, 'templates'));
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
            <div className='w-full title text-2xl'>Name:</div>
            <input type='text' onChange={(e) => {setName(e.target.value);}} className='w-full p-2 border border-black rounded-md' placeholder='Sky Moone ...' />
            <div className='w-full title text-2xl'>Url:</div>
            <input type='text' onChange={(e) => {setUrl(e.target.value);}} className='w-full p-2 border border-black rounded-md' placeholder='https://logic-web-design.com ...' />            
            <div className='w-full title text-2xl'>Template Picture:</div>
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
            <div className='w-full title text-2xl'>Template Images:</div>
            <div className='flex flex-col w-full gap-10 items-start'>
              <div className='grid grid-cols-4 gap-5'>
                {
                  imagesURLs ? 
                    imagesURLs.map((url, i) => {
                      return(
                        <img key={i} src={url} alt='' className='w-60 rounded-md' />
                      )
                    })                     
                  :
                    null
                }
              </div>              
              <div className='flex flex-row'>
                <input type="file" onChange={handleImageChange} className='p-2'/>
                <button onClick={handleImageValidate} className=''>
                  <svg className='fill-green-500' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                  </svg>
                </button>
              </div>            
            </div> 
            
            <div className='w-full flex flex-row justify-end'>
                <button onClick={() => {createTemplate(name, url, ppURL, imagesURLs);}}>
                    <svg className='fill-green-500' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                    </svg>
                </button>
            </div>
        </div>
        {
            templates.map((t, i) => {
                return(
                    <div key={i} className='w-[1100px] flex flex-col justify-center gap-5 bg-white rounded-xl mt-10 p-10 shadow-xl'>
                      <div className='flex flex-row gap-10'>
                        <img src={t.pp} alt='' className='rounded-xl shadow-xl w-60' />
                        <div className='flex flex-col w-full'>
                            <div className='flex flex-row justify-between gap-5'>
                                <div className='title my-auto'>{t.name}</div>
                                <button onClick={() => {handleDelete(t.id);}}>
                                    <svg className='fill-red-500' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                    </svg>
                                </button>
                            </div>                            
                            <div className='mt-5'>Link: <a target='blank' href={t.url} className='text-blue-500 underline'>{t.url}</a></div>
                        </div>
                      </div>
                      <div className='grid grid-cols-4 mt-10'>
                        {
                          t.images.map((img, j) => {
                            return (
                              <img key={j} src={img} alt='' className='rounded-xl shadow-xl w-60' />
                            )
                          })
                        }
                      </div>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}
