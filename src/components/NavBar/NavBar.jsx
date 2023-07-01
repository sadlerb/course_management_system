import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import userIcon from '../../assets/UserIcon.svg';
import { ReactComponent as DashboardIcon } from '../../assets/dashboard.svg';
import { ReactComponent as CoursesIcon } from "../../assets/courses.svg";
import { ReactComponent as ManageIcon } from "../../assets/manage.svg"
import "./NavBar.scss"

const NavBar = () => {
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
                    <li>
                        <NavLink to="/admin/courses">
                            <div>
                                <CoursesIcon fill="white" className="nav-icons" />
                                <p>All Courses</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/manage">
                            <div>
                                <ManageIcon fill="white" className="nav-icons" />
                                <p>Manage Courses</p>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>




    )
}

export default NavBar;