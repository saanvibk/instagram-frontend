import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './profilePage.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const data = await fetch(`${config.backendURL}/post/userPosts`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include', // Include credentials (cookies)
    });

    if (data.status === 401) {
      navigate('/');
    }

    if (data.status === 200) {
      const response = await data.json();
      console.log(response);
      setPosts(response.userPosts);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='posts-grid'>
      {posts.map((post) => (
        <div key={post._id} className='post'>
          <img src={post.post} alt={post.caption} />
          {/* Add caption or other post details */}
        </div>
      ))}
    </div>
  );
}

export default Posts;
