import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:6500/auth/home', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include', // Include credentials (cookies)
      });
      console.log(res.status);

      if (res.status === 401) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const data = await fetch('http://localhost:6500/auth/logout', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include', // Include credentials (cookies)
      });
      const status = data.status;
      const res = await data.json();
      console.log(status, res);

      if (status === 200) {
        toast.success(res.msg);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
      if (status === 401) {
        toast.error(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='home'>
      <h1>Welcome to home page </h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
