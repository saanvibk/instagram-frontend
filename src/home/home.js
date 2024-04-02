import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './navbar';

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
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='home'>
      <Navbar />

      <ToastContainer />
      <h1>Welcome to home page </h1>
    </div>
  );
};

export default HomePage;
