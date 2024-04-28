import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profilePage.css';
import ProfilePic from './profilePic';
import Navbar from '../home/navbar';
import config from '../config';
import Posts from './Posts';

const Profile = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch(`${config.backendURL}/user/profile`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include', // Include credentials (cookies)
      });
      const status = res.status;

      if (status === 401) {
        navigate('/');
      }

      if (status === 200) {
        const data = await res.json();
        setUser(data);
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
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7-_ejhfjun3WS6ya6cX5xO38IAZcA5S8em6u-wQHQwrijW4jrI57-NDbbszUJXhZjbo&usqp=CAU'
              }
              alt='Profile'
            />
            <ProfilePic />
          </div>
          <div className='profile-info'>
            <h2>{user.username}</h2>
            <h3>{user.fullname}</h3>
            <p>{user.bio}</p>
            <div className='profile-stats'>
              <p>{posts.length ? posts.length : 0} posts</p>
              <p>{user.followers ? user.followers.length : '0'} followers</p>
              <p>{user.following ? user.following.length : '0'} following</p>
              <p></p>
            </div>
          </div>
        </div>
        <div className='profile-posts'>
          <Posts />
        </div>
      </div>
    </>
  );
};

export default Profile;
