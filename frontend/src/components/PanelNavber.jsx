import React,{useContext} from "react"
import { AdminContext } from "../context/AdminContext"
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from "../context/DoctorContext"
import { assets } from "../assets/assets"

const PanelNavber = () => {
  const {aToken,setAToken} = useContext(AdminContext)
  const {dToken , setDToken} = useContext(DoctorContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
   }

return (
  <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex item-center gap-2 text-xs '>
          <img className='w-20 cursor-pointer sm:w-20' src={assets.CT_logo} />
          <p className='flex items-center justify-center border px-3 rounded-full border-gray-500 text-gray-600 '>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
  </div>
)
}

export default PanelNavber