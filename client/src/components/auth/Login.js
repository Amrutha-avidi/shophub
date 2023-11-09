import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/authSlice'
import {  useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const auth = useSelector(state => state.auth)
    console.log(auth)

    useEffect(()=>{
        if(auth._id){
            navigate('/products')
        }
    },[auth._id,navigate])

    const [user, setUser] = useState({
       
        email: '',
        password: ''
    })
    const handelSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(user))
    }

    return (
        <>
            <form className='flex flex-col text-center mt-4' onSubmit={handelSubmit}>
                <h2 className='font-serif text-blue-900 font-extrabold text-[40px]'>Login</h2>
                <div className='flex flex-col justify-center items-center mt-5'>

                    
                 
                    <input className='my-2 border border-gray-800 p-2 rounded-xl w-80 '
                     type='email' placeholder="Email" onChange={(ev) => setUser({ ...user, email: ev.target.value })} />
                    <input className='my-2 border border-gray-800 p-2 rounded-xl w-80 '
                     type='password' placeholder="Password" onChange={(ev) => setUser({ ...user, password: ev.target.value })} />
                    <button className='bg-blue-600 w-80 mt-3 text-white rounded-xl p-2'>
                        {auth.loginState === 'Pending' ? 'Submitting' : 'Login'}
                    </button>

                    {auth.loginStatus === 'rejected' ? 
                    <p className='text-red-800'>{auth.loginError}</p> : null}
                </div>
            </form>
        </>
    )
}

export default Login