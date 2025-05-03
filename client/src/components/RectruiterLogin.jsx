import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets/assets'
import { AppContext } from '../context/AppContext'

function RectruiterLogin() {
    const [state, setState] = useState ('Login')
    const [name, setName] = useState('')
    const [password , setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(false)
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)
    const {setShowRecruiterLogin} = useContext(AppContext)
    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        if(state == 'Sign Up' && !isTextDataSubmitted){
            setIsTextDataSubmitted(true)
        }
    }
    useEffect(()=>{
        document.body.style.overflow = 'hidden'

        return ()=>{
            document.body.style.overflow = 'unset'
        }
    },[])
  return (
    <div className='absolute top-0 right-0 bottom-0 left-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} action="" className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-xl text-neutral-700 font-medium'>Recruiter {state}</h1>
        <p className='text-sm'>Welcome back! Please {state === 'Login' ? 'Sign In' : 'Sign Up'} to continue</p>
        {state === 'Sign Up' && isTextDataSubmitted ? <>
        <div className='flex items-center gap-4 my-10'>
            <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image): assets.upload_area} alt="" className='w-16 rounded-full cursor-pointer '/>
                <input type="file" hidden id='image' onChange={e=>setImage(e.target.files[0])}/>
            </label>
            <p>Upload Company<br /> Logo</p>
        </div>
        </>: <>
        {
            state !== 'Login' && ( <div className='border px-4 flex items-center py-2 rounded-full mt-5 gap-2'>
            <img src={assets.person_icon} alt="" />
            <input type="text" required placeholder='Company Name' onChange={e=>setName(e.target.value)} value={name} className='outline-none text-sm'/>
        </div>)
        }
       
        <div className='border px-4 flex items-center py-2 rounded-full mt-5 gap-2'>
            <img src={assets.email_icon} alt="" />
            <input type="email" required placeholder='Enter email' onChange={e=>setEmail(e.target.value)} value={email} className='outline-none text-sm'/>
        </div>
        <div className='border px-4 flex items-center py-2 rounded-full mt-5 gap-2'>
            <img src={assets.lock_icon} alt="" />
            <input type="password" required placeholder='Enter password' onChange={e=>setPassword(e.target.value)} value={password} className='outline-none text-sm'/>
        </div>
        </>}

        {state === 'Login' && <p className='text-sm text-blue-600 cursor-pointer mt-4 '>Forgot password ?</p>}
        
        <button className='bg-blue-600 w-full text-white py-2 rounded-full mt-4' type='sumbit'>
            {state === 'Login' ? 'login' : isTextDataSubmitted ? 'Create account': 'Next'}
        </button>

        {
            state === 'Login' ? <p className='mt-5 text-center'>Don't have an account? <span onClick={()=> setState('Sign Up')} className='text-blue-600 cursor-pointer'>Sign Up</span></p> :  <p className='mt-5 text-center'>Already have an account? <span onClick={()=>setState('Login')} className='text-blue-600 cursor-pointer'>Login</span></p>
        }
        <img onClick={e=>setShowRecruiterLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>
      </form>
    </div>
  )
}

export default RectruiterLogin