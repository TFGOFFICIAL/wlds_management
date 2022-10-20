import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import logo from './../assets/icons/LOGO_WHITE.png'

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const [error, setError] = useState('')

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    try {
        await signIn(email,password);
        navigate('/dashboard')
    } catch (e) {
        setError('User not found!')
    }
  }
  return (
    <div className='bg-hero w-full h-[100vh] flex flex-col items-center justify-center'>
        <img alt='' className='absolute w-10 top-5 left-5' src={logo}/>
        <div className='w-[98vw] lg:w-[400px] bg-white/95 rounded-2xl border shadow-xl flex flex-col items-center'>
            <div className='title my-20'>Sign In</div>
            <div className='w-[95%] flex flex-col items-center gap-5'>
                <input className='border p-2 rounded-2xl w-full' onChange={(e) => {setEmail(e.target.value);}} type='email' placeholder='Your email ...' />
                <input className='border p-2 rounded-2xl w-full' onChange={(e) => {setPassword(e.target.value);}} type='password' placeholder='Your password ...' />
            </div>
            <button className='subtitle font-bold text-white w-[95%] bg-gradient-to-r from-violet-800 to-red-700 my-10 py-2 rounded-xl' onClick={handleSignin}>Sign In</button>
        </div>
    </div>
  )
}
