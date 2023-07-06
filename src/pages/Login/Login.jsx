import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

import "./Login.scss"


const Login = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [authData, setAuthData] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false)


    const submitAuthData = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const response = await fetch(`https://course-management-6osz.onrender.com/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...authData }),
        })
            .catch(error => {
                window.alert(error);
                setIsLoading(false)
                return;

            });

        const data = await response.json();
        if (data.status === true) {
            setCurrentUser(data.user)
        } else {
            setIsLoading(false);
            alert("Incorrect Username or Password");
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setAuthData(values => ({ ...values, [name]: value }));


    }

    if (currentUser) return <Navigate to="/" />

    return (
        <div>
            {isLoading ? (<Spinner />) : (
                <div className="login-container">
                    <div className="header">
                        <h2>Login</h2>
                    </div>
                    <div className="login-form-container">
                        <form onSubmit={submitAuthData}>
                            <div className="form-input">
                                <label>Username</label>
                                <input type="text" name="username" onChange={handleChange} value={authData.username} required/>
                            </div>
                            <div className="form-input">
                                <label>Password</label>
                                <input type="password" name="password" onChange={handleChange} value={authData.password} required />
                            </div>
                            <input type="submit" value="Login" className="submit-button"/>
                        </form>
                    </div>
                </div>)}
        </div>

    )
}


export default Login;