import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navber = () => {

    const {aToken,setAToken} = useContext(AdminContext)

    const navigate = useNavigate()

    const logout = () => {
      navigate('/')
      aToken && setAToken('')
      aToken && localStorage.removeItem('aToken')
     }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center justify-center gap-2 text-xs '>
            <img className='w-40 cursor-pointer sm:w-40' src={assets.CT_logo}/>
            <p className='border mt-4 px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>{aToken ? 'Admin' : ''}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navber