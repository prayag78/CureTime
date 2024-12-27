import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navber = () => {
  const navigate = useNavigate();

  const[showMe , setshowMe] = useState(false);

  const {token , setToken , userData} = useContext(AppContext)

  const logout = () =>{
    setToken('')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-2 mb-5 border-b border-b-gray-300'>
        <NavLink to='/'>
        <img className='w-40 cursor-pointer' src={assets.CT_logo}/>
        </NavLink>
        <ul className='hidden md:flex items-start gap-16 font-medium text-lg'>
          <NavLink to='/'>
            <li className='py-1 ' >Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-9/12 m-auto hidden'/>
          </NavLink>
          <NavLink to='/doctors'>
            <li className='py-1' >All Doctors</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
          <NavLink to='about'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
          <NavLink to='contact'>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
        </ul>
        <div>
        {
          token && userData ? 
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image}/>
            <img className='w-2.5' src={assets.dropdown_icon}/>

            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointment</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>

              </div>
            </div>

          </div> :
          <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block '>Create Account</button>

        }
        </div>
    </div>
  )
}

export default Navber