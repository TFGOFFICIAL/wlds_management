import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import logo from './../assets/icons/LOGO_WHITE.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const [error, setError] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [showHide, setShowHide] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    try {
        await signIn(email,password);
        navigate('/dashboard/contact')
    } catch (e) {
        setError('User not found with this email/password!');
        setFormKey(formKey + 1);
        setTimeout(function() { setError('') }, 3000);
    }
  }

  return (
    <div className='bg-hero w-full h-[100vh] flex flex-col items-center justify-center'>
        <img alt='' className='absolute w-10 top-5 left-5' src={logo}/>        
        <div className={classNames(error ? 'absolute' : 'hidden','top-20 lg:top-60 w-full')}>
          <div className='w-[1100px] mx-auto min-h-20 flex flex-col items-center justify-center px-10 py-5 text-white bg-red-700 rounded-2xl font-semibold'>{error}</div>
        </div>
        <div key={formKey} className='w-[98vw] lg:w-[400px] bg-white rounded-md flex flex-col items-center'>
            <div className='title my-20'>Connexion</div>
            <div className='w-[95%] flex flex-col items-center gap-5'>
                <input className='w-full p-2 rounded-md mb-4 border border-black' onChange={(e) => {setEmail(e.target.value);}} type='email' placeholder='exemple@logic-web-design.com' />
                <div className='flex flex-row w-full'>
                  <input className='w-[80%] p-2 rounded-md border border-black' onChange={(e) => {setPassword(e.target.value);}} type={classNames(showHide ? 'text' : 'password')} placeholder='Your password ...' />
                  <button onClick={() => {setShowHide(!showHide);}} className='w-[20%] flex flex-col items-center justify-center'>
                    {
                      showHide ? 
                        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                      :
                        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                        </svg>
                    }
                  </button>
                </div>                
            </div>
            <div className='w-full flex flex-row justify-end px-10 my-10'>
              <button className='p-3 rounded-md bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg font-semibold text-white' onClick={handleSignin}>Login</button>
            </div>            
        </div>
    </div>
  )
}
