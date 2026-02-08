import { useNavigate } from "react-router-dom"
import './Home.css'

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className='home--box'>
      <nav>
        <div className="nav--link">
          <p>Home</p>
          <p onClick={() => navigate('/login')}>Login</p>
          <p onClick={() => navigate('/register')}>Register</p>
        </div>
      </nav>
      <div className="home--contain">
        <div className="home--container">
        <h2>Secure User Registration & Login System</h2>
        <p>A simple full-stack application with authentication and dashboard access.</p>
        <div className="home--btn">
          <button className="btn1" onClick={() => navigate('/login')}>Login</button>
          <button className="btn2" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
      </div>
      <footer>
        <p>@2026 User Registration & Login System</p>
      </footer>
    </div>
  )
}

export default Home