import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'

const MyAppointments = () => {

    const { backendUrl, token ,getDoctorsData} = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [removedAppointments, setRemovedAppointments] = useState([]);

    const months = [" ","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {
      console.log(appointmentId);
      

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const removeAppointment = (id) => {
        const updatedAppointments = appointments.filter(app => app._id !== id);
        setAppointments(updatedAppointments);
        const updatedRemovedAppointments = [...removedAppointments, id];
        setRemovedAppointments(updatedRemovedAppointments);
        localStorage.setItem('removedAppointments', JSON.stringify(updatedRemovedAppointments));
    };

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    useEffect(() => {
        const storedRemovedAppointments = JSON.parse(localStorage.getItem('removedAppointments')) || [];
        setRemovedAppointments(storedRemovedAppointments);
    }, []);

    const filteredAppointments = appointments.filter(app => !removedAppointments.includes(app._id));

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            <div className=''>
                <AnimatePresence>
                    {filteredAppointments.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'
                        >
                            <div>
                                <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
                            </div>
                            <div className='flex-1 text-sm text-[#5E5E5E]'>
                                <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
                                <p>{item.docData.speciality}</p>
                                <p className='text-[#464646] font-medium mt-1'>Address:</p>
                                <p className=''>{item.docData.address.line1}</p>
                                <p className=''>{item.docData.address.line2}</p>
                                <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                            </div>
                            <div></div>
                            <div className='flex flex-col gap-2 justify-center text-sm text-center'>
                                {item.isCompleted && (
                                    <>
                                        <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
                                        <button onClick={() => removeAppointment(item._id)} className='sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Remove</button>
                                    </>
                                )}
                                {!item.cancelled && !item.isCompleted && (
                                    <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
                                )}
                                {item.cancelled && !item.isCompleted && (
                                    <>
                                        <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>
                                        <button onClick={() => removeAppointment(item._id)} className='sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Remove</button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default MyAppointments