import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './navbar';
import './home.css';
import SinglePost from './SinglePost';

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:6500/post/allPost', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include', // Include credentials (cookies)
      });
      console.log(res.status);

      if (res.status === 401) {
        navigate('/');
      }

      if (res.status === 200) {
        const data = await res.json();
        setData(data.posts);
        setUserID(data.user.id);
        console.log(userID);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='home'>
      <Navbar />
      <ToastContainer theme='dark' />
      <div className='home'>
        <div>
          {data.map((post) => {
            return <SinglePost post={post} userID={userID} />;
          })}
        </div>
      </div>{' '}
    </div>
  );
};
export default HomePage;
