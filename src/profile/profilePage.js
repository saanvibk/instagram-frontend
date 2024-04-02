import { React, useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './profilePage.css';
import ProfilePic from './profilePic';
import Navbar from '../home/navbar';

const Profile = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:6500/user/profile', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include', // Include credentials (cookies)
      });
      const status = res.status;

      if (status === 200) {
        const data = await res.json();
        setUser(data);
      }
      if (status === 401) {
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
    <>
      <Navbar />
      <div className='profile-page'>
        <div className='profile-header'>
          <div className='profile-picture'>
            <img src={user.profilePic} alt='Profile' />
            <ProfilePic />
          </div>
          <div className='profile-info'>
            <h2>{user.username}</h2>
            <h3>{user.fullname}</h3>
            <p>{user.bio}</p>
            <div className='profile-stats'>
              <p>{user.posts} posts</p>
              <p>{user.followers ? user.followers.length : '0'} followers</p>
              <p>{user.following ? user.following.length : '0'} following</p>
            </div>
          </div>
        </div>
        <div className='profile-posts'>{/* Render user's posts */}</div>
      </div>
    </>
  );
};

export default Profile;
