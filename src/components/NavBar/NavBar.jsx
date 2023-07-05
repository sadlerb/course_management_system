import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import userIcon from '../../assets/UserIcon.svg';
import { ReactComponent as DashboardIcon } from '../../assets/dashboard.svg';
import { ReactComponent as ManageIcon } from "../../assets/manage.svg"
import "./NavBar.scss";

import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const NavBar = () => {
    const {currentUser,setCurrentUser} = useContext(UserContext);
    const logout = () =>{
        setCurrentUser(null);
        localStorage.removeItem("current_user")
        
    }


   
    return (
        <div className="nav-container">
            <img src={logo} alt="company logo" />
            <img src={userIcon} alt="account icon" />
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            <div>
                                <DashboardIcon fill="white" className="nav-icons" />
                                <p>Dashboard</p>
                            </div>
                        </NavLink>
                    </li>

                    {currentUser.role === "admin" && <li>
                        <NavLink to="/manage">
                            <div>
                                <ManageIcon fill="white" className="nav-icons" />
                                <p>Manage Courses</p>
                            </div>
                        </NavLink>
                    </li>}
                </ul>
            </nav>
            <button onClick={logout} className="logout-button">Logout</button>
        </div>




    )
}

export default NavBar;