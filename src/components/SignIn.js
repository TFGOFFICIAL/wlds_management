import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import logo from './../assets/icons/LOGO_WHITE.png'

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const [error, setError] = useState('');
  const [formKey, setFormKey] = useState(0);

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
        {error ? 
          <div className='absolute top-20 w-full'>
            <div className='w-[1100px] mx-auto min-h-20 flex flex-col items-center justify-center px-10 py-5 text-white bg-red-700/70 rounded-2xl'>{error}</div>
          </div>
          :
          null
        }
        <div key={formKey} className='w-[98vw] lg:w-[400px] bg-white/95 rounded-2xl border shadow-xl flex flex-col items-center'>
            <div className='title my-20'>Sign In</div>
            <div className='w-[95%] flex flex-col items-center gap-5'>
                <input className='border p-2 rounded-2xl w-full' onChange={(e) => {setEmail(e.target.value);}} type='email' placeholder='Your email ...' />
                <input className='border p-2 rounded-2xl w-full' onChange={(e) => {setPassword(e.target.value);}} type='password' placeholder='Your password ...' />
            </div>
            <button className='subtitle font-bold text-white w-[95%] bg-gradient-to-r from-violet-800 to-red-700 my-10 py-2 rounded-xl hover:shadow-xl hover:shadow-violet-300' onClick={handleSignin}>Sign In</button>
        </div>
    </div>
  )
}
