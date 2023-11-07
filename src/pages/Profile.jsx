//10
/* eslint-disable no-unused-vars */
import { useAuthContext } from "../context/AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
const Profile = () => {
    const { user } = useAuthContext();
    return (
        <div className="row">
            <div className="col-6 card profile my-2 light mx-auto" style={{
                width: "500px",
                borderRadius: "20px",
                backgroundColor: "#C3EEFA",
            }}>
                <div className="card-header">Profile</div>
                <div className="card-body">
                    <div className="card-title h5">{user.username}</div>
                    <div className="card-text">
                        <b>Token</b>
                        {user.accessToken.substring(0, 20)}...
                        {user.accessToken.substring(user.accessToken.lenght - 20)}
                    </div>
                    <div className="card-text">
                        <b>Id:</b> {user.id}
                        <br />
                        <b>Email::</b> {user.email}
                        <br />
                        <b>Roles:</b> ({user.roles.lenght})
                        <br />
                        <ul>
                            {user.roles && user.roles.map((role, index)=><li key={index}>{role}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;