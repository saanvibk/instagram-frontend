import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './navbar';
import './home.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const [result, setResult] = useState([]);

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
        const posts = await res.json();
        setData(posts);
        console.log(posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makeComment = async (postId) => {
    const res = await fetch('http://localhost:6500/post/comment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment, postId }),
      credentials: 'include', // Include credentials (cookies)
    });

    if (res.status === 401) {
      navigate('/');
    }
    if (res.status === 200) {
      const result = await res.json();
      setResult(result.updateComment);
      console.log('result', result.updateComment);
    }
  };

  const toggleComment = (post) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(post);
      console.log('item', item);
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
        {/* card */}
        {data.map((post) => {
          return (
            <div key={post._id} className='card'>
              {/* card header */}
              <div className='card-header'>
                <div className='card-pic'>
                  <img src={post.postedBy.profilePic} alt='' />
                </div>
                <h5>{post.postedBy.username}</h5>
              </div>
              {/* card image */}
              <div className='card-image'>
                <img src={post.post} alt='' />
              </div>

              {/* card content */}
              <div className='card-content'>
                <p>
                  <b style={{ marginRight: '5px' }}>
                    {post.postedBy.username}{' '}
                  </b>{' '}
                  <span>{post.caption}</span>
                  <p
                    style={{ fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => {
                      toggleComment(post);
                    }}
                  >
                    View all comments
                  </p>
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
                    makeComment(post._id);
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          );
        })}

        {/* show Comment */}
        {show && (
          <div className='showComment'>
            <div className='container'>
              <div className='postPic'>
                <img src={item.post} alt='' />
              </div>
              <div className='details'>
                {/* card header */}
                <div
                  className='card-header'
                  style={{ borderBottom: '1px solid #00000029' }}
                >
                  <div className='card-pic'>
                    <img src={item.postedBy.profilePic} alt='' />
                  </div>
                  <h5>{item.postedBy.username}</h5>
                </div>

                {/* commentSection */}
                <div
                  className='comment-section'
                  style={{ borderBottom: '1px solid #00000029' }}
                >
                  {item.comments.map((comment) => {
                    console.log(comment);

                    return (
                      <p key={comment._id} className='comm'>
                        <span
                          className='commenter'
                          style={{ fontWeight: 'bolder', marginRight: '10px' }}
                        >
                          {comment.postedBy.username}
                        </span>
                        <span className='commentText'>{comment.comment}</span>
                      </p>
                    );
                  })}
                </div>

                {/* card content */}
                <div className='card-content'>
                  <p>{item.likes.length} Likes</p>
                  <p>{item.caption}</p>
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
                      makeComment(comment, item._id);
                      toggleComment();
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
            <div
              className='close-comment'
              onClick={() => {
                toggleComment();
              }}
            >
              <span className='material-symbols-outlined material-symbols-outlined-comment'>
                close
              </span>
            </div>
          </div>
        )}
      </div>{' '}
    </div>
  );
};

export default HomePage;
