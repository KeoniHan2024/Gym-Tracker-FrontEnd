import { Navigate, Outlet } from "react-router-dom";

const Logout = () => {
    localStorage.removeItem("token")
    return <Navigate to="/login"/>
}
export default Logout;