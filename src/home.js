import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ email }) => {
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='home'>
      <h1>Welcome to home page {email}</h1>
    </div>
  );
};

export default HomePage;
