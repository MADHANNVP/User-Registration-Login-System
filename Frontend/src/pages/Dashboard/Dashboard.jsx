import { useState, useEffect } from 'react'
import { useAuth } from '../Auth/AuthProvider'
import { useNavigate } from 'react-router-dom';
import axios from '../../Api/axios';
import './Dashboard.css'

const Dashboard = () => {

  const { token, authLogout } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token])

  useEffect(() => {

    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.status == 200) {
          setUser(res.data);
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (token) fetchDashboard();
  }, [token])

  return (
    <>
      <div className='dashboard--box'>
        <h2 className='dashboard--username'>Hi {user?.username} Welcome</h2>
        <button className='logout--btn' onClick={authLogout}>Logout</button>
      </div>
    </>
  )
}

export default Dashboard