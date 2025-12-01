import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const UserRoutes = () => {
    const [role,setRole]=useState(null)
    const [isloading,setIsloading]=useState(true)
    useEffect(()=>{
        var r=localStorage.getItem("role")
        setRole(r)
        setIsloading(false)
    },[])
    if(isloading){
        return(<div>Loading...</div>)
    }
  return role=="user"? <Outlet/>:<Navigate to="/login" replace />
}
