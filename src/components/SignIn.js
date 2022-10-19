import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

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
    <div className='w-full h-[100vh] flex flex-col items-center justify-center'>
        <div className='w-[98vw] lg:w-[400px] bg-white border shadow-xl flex flex-col items-center'>
            <div className='title my-20'>Sign In</div>
            <div className='w-[95%] flex flex-col items-center gap-5'>
                <input className='border p-1 w-full' onChange={(e) => {setEmail(e.target.value);}} type='email' placeholder='Email ...' />
                <input className='border p-1 w-full' onChange={(e) => {setPassword(e.target.value);}} type='password' placeholder='Password ...' />
            </div>
            <button className='subtitle font-bold text-white w-[95%] bg-gradient-to-r from-purple-700 to-red-600 my-10 py-2' onClick={handleSignin}>Sign In</button>
        </div>
    </div>
  )
}
