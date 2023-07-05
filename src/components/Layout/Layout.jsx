import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

import './Layout.scss'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


const Layout = () => {
    const {currentUser} = useContext(UserContext);
    if (!currentUser) return <Navigate to="/login"/>
    return (
        <main>
            {< NavBar />}
            <div className="content">
                <Outlet />
            </div>
        </main>
    )
}

export default Layout;