import { useEffect, useState } from 'react'
import axios from '../../Api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import './Register.css'

const Register = () => {


    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate(null);
    const { token } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        const userdate = {
            username, email, password
        }

        try {
            const res = await axios.post("/signup", userdate);
            if (res.status == 200) {
                navigate("/login");
                setEmail("");
                setUsername("");
                setPassword("");
            }
        } catch (err) {
            if (err.response?.data) {
                setMessage(err.response.data);
            } else {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate])

    return (
        <section>
            <div className='resister--box'>
                <form onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <div className='input--box'>
                        <input type="text" id="userName" onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="userName">Username</label><br />
                        <span>
                            <i className="fa-solid fa-user"></i>
                        </span>
                    </div>
                    <div className="input--box">
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="email">Email</label>
                        <span>
                            <i className="fa-solid fa-envelope"></i>
                        </span>
                    </div>
                    <div className="input--box">
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="password">Password</label>
                        <span>
                            <i className="fa-solid fa-lock"></i>
                        </span>
                    </div>
                    <button type="submit">Submit</button>

                    <div className="login--btn--box">
                        <p>Already have an account?</p>
                        <p className="login--btn" onClick={() => navigate('/login')}>Sign in</p>
                    </div>
                    {
                        message ? <p>message</p> : ""
                    }
                </form>
            </div>
        </section>
    )
}

export default Register