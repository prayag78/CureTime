import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) =>{

    const currencySymbol = '$'
    const currency = '$'
    const months = [" ","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors] = useState([])

    const [token,setToken] =  useState(localStorage.getItem('token') ? localStorage.getItem('token') : '' )
    const [userData , setUserData] = useState(false)

    const getDoctorsData = async() =>{
        try{
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(data.doctors)

        }
    }

    const loadUserProfileData = async(req,res) =>{
        try{
            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if(data.success){
                setUserData(data.userData)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error(data.doctors)

        }
    }

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const calculateAge = (dob) =>{
        const today = new Date()
        const birtDate = new Date(dob)

        let age = today.getFullYear() - birtDate.getFullYear()
        return age
    }

    const value = {
        doctors,getDoctorsData,
        currencySymbol,currency,months,
        token,setToken,
        backendUrl,
        userData,setUserData,loadUserProfileData,
        slotDateFormat,calculateAge
    }


    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider