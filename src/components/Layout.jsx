/* eslint-disable no-unused-vars */
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"

// eslint-disable-next-line react-refresh/only-export-components
const Layout = () =>{
    return(
        <AuthProvider>
            <NavBar/>
            <div className='App'>
                <Outlet/>
            </div>
        </AuthProvider>
    )
}
export default Layout;