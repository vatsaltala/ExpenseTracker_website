import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const [auth, setauth] = useState({ isLoggedin: false, role: null });
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (id && role) {
      setauth({ isLoggedin: true, role: role });
    }
    setisLoading(false);
  }, []);
  return { auth, isLoading };
};

const PrivateRoutes = ()=>{

    const {auth,isLoading} = useAuth()
    if(isLoading){
        return <div>loading...</div>
    }
    return auth.isLoggedin == true?<Outlet/> :<Navigate to="/login"/>
    //{auth:{isLoggdin:true|fasle,role:""||role:"admin"},isLaoding:true}

}
export default PrivateRoutes;