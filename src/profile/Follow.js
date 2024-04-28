import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './follow.css';

const Follow = ({ user }) => {
  const navigate = useNavigate();
  const [followed, setFollowed] = useState(false);

  const follow = async (userID) => {
    const res = await fetch(`${config.backendURL}/user/follow`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userID }),
      credentials: 'include', // Include credentials (cookies)
    });

    if (res.status === 401) {
      navigate('/');
    }

    if (res.status === 200) {
      const updatedUser = await res.json();
      console.log(updatedUser);
    }
  };

  const unfollow = async (userID) => {
    const res = await fetch(`${config.backendURL}/user/unfollow`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userID }),
      credentials: 'include', // Include credentials (cookies)
    });

    if (res.status === 401) {
      navigate('/');
    }

    if (res.status === 200) {
      const updatedUser = await res.json();
      console.log(updatedUser);
    }
  };
  return (
    <>
      <h2>{user.username}</h2>
      {/* follow button */}
      {followed ? (
        <button
          className='unfollow-btn profile-btn'
          onClick={() => {
            setFollowed(false);
            unfollow(user._id);
          }}
        >
          Unfollow
        </button>
      ) : (
        <button
          className='follow-btn profile-btn'
          onClick={() => {
            setFollowed(true);
            follow(user._id);
          }}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default Follow;
