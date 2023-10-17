import { useAuthContext } from "../context/AuthContext";

export default  function authHeader(){
    const user = JSON.parse(localStorage.getItem("user"));
    if( user && user.accessToken){
        return {"x-access-Token": user.accessToken};
    } else {
        return {};
    }
}