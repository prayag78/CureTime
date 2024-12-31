import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) =>{
     
    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors] = useState([])
    const [dashData , setDashdata] = useState(false)

    const[appointments , setAppointments] = useState([])

    const getAllDoctors = async () =>{
        try{

        const {data} = await axios.post(backendUrl + '/api/admin/all-doctors' , {} , {headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors)
                
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }


    const changeAvailablity = async (docId) =>{
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/change-availablity' , {docId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const getAllappointments = async () =>{
        try{
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const cancelAppointment = async(appointmentId) =>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId}, {headers:{aToken}})
            if(data.success){
                console.log(data.appointments);
                getAllappointments()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async() =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
            if(data.success){
                setDashdata(data.dashData)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken,setAToken,
        backendUrl,doctors,
        getAllDoctors,changeAvailablity,
        appointments,setAppointments,getAllappointments,
        cancelAppointment,
        dashData,getDashData
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider