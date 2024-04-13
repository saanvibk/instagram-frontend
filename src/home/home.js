import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './navbar';
import './home.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');

  const fetchData = async () => {
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
        const posts = await res.json();
        setData(posts);
        console.log(posts);
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
      <ToastContainer theme='dark' />
      <div className='home'>
        {/* card */}
        {data.map((posts) => {
          return (
            <div className='card'>
              {/* card header */}
              <div className='card-header'>
                <div className='card-pic'>
                  <img src={posts.postedBy.profilePic} alt='' />
                </div>
                <h5>
                  <Link to={`/profile/${posts.postedBy._id}`}>
                    {posts.postedBy.username}
                  </Link>
                </h5>
              </div>
              {/* card image */}
              <div className='card-image'>
                <img src={posts.post} alt='' />
              </div>

              {/* card content */}
              <div className='card-content'>
                <p>
                  <b style={{ marginRight: '5px' }}>
                    {posts.postedBy.username}{' '}
                  </b>{' '}
                  <span>{posts.caption}</span>
                </p>
              </div>

              {/* add Comment */}
              <div className='add-comment'>
                <input
                  type='text'
                  placeholder='Add a comment'
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className='comment'
                  onClick={() => {
                    // makeComment(comment, posts._id);
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          );
        })}

        {/* show Comment */}
      </div>{' '}
    </div>
  );
};

export default HomePage;
