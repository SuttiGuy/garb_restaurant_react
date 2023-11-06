import {useContext, createContext, useState} from "react";
import AuthService from "../services/auth.service";

const AuthContext = createContext(null);
export const AuthProvider = ({children}) =>{
    const [user,setUser] =useState(getUser);
    const login = (user) => setUser(user);
    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    function getUser() {
        const temp = localStorage.getItem("user");
        const savedUser = JSON.parse(temp);
        return savedUser || null;
    };
    //16
   

    return(
        <AuthContext.Provider value={{user,login,logout}} >
        {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () =>  useContext(AuthContext);