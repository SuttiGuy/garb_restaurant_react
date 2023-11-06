const getlocalRefreshToken = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
}

const getlocalAccessToken = () =>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accesssToken;
}

const setlocalAccessToken = (token) => {
    const user = JSON.parse(localStorage.getItem("user"))
    user.accesssToken = token;
    localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
const setUser = () => {
    localStorage.setItem("user", JSON.stringify(user))
};
const removeUser = () => {
    localStorage.removeItem("user")
};

const TokeService = {
    getlocalRefreshToken,
    getlocalAccessToken,
    setlocalAccessToken,
    getUser,
    setUser,
    removeUser
}
export default TokeService;