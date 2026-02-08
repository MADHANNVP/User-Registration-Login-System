import { useEffect, useState } from 'react'
import axios from '../../Api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import './Login.css'

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();
    const { token, authLogin } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = {
            username, password
        }

        try {
            const res = await axios.post("/signin", userData);
            if (res.status == 200) {
                authLogin(res.data);
                setUsername("");
                setPassword("");
            }
        } catch (err) {
            setMessageType("error");

            if (!err.response) {
                setMessage("Server not reachable. Try again.");
                setMessageType("error");
                return;
            }

            const status = err.response.status;

            if (status === 401) {
                setMessage(err.response.data || "Invalid username or password");
            } else if (status === 403) {
                setMessage("Access denied");
            } else {
                setMessage("Server error . Please try again.");
            }
        }
    }

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage("");
            setMessageType("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [message])


    useEffect(() => {
        if (token) {
            navigate('/dashboard');
        }
    }, [token, navigate])

    return (
        <section>
            <div className="login--box">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input--box">
                        <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="username">Username</label>
                        <span>
                            <i className="fa-solid fa-user"></i>
                        </span>
                    </div>
                    <div className="input--box">
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="password">Password</label>
                        <span>
                            <i className="fa-solid fa-lock"></i>
                        </span>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register--box">
                        <p>Don't have an account?</p>
                        <p className="register--btn" onClick={() => navigate('/register')}>Register</p>
                    </div>
                    <div>
                        {
                            message ? <p className={`message ${messageType}`}>{message}</p> : ""
                        }</div>
                </form>
            </div>
        </section>
    )
}

export default Login