import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doneImg from '../assets/postSuccess.png';
import './createpost.css';
import Navbar from '../home/navbar';

function CreatePost() {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [userData, setUserData] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);
  const navigate = useNavigate();

  const fetchUserdata = async () => {
    try {
      const data = await fetch('http://localhost:6500/user/profile', {
        method: 'GET',
        credentials: 'include',
      });

      if (data.status === 401) {
        navigate('/');
      }

      const res = await data.json();
      setUserData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append the file to the FormData
    formData.append('file', image);

    // Append caption to the FormData
    formData.append('caption', caption);

    console.log('file- ', image);
    console.log('formData-', formData);
    try {
      // Send a POST request with Fetch API
      const response = await fetch('http://localhost:6500/post/createPost', {
        method: 'POST',
        body: formData, // Pass the FormData object as the request body
        credentials: 'include', // Include credentials (cookies)
      });

      // Handle response
      if (response.status === 401) {
        navigate('/');
      }
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log('Post uploaded successfully:', data);
        setPostSuccess(true);
      } else {
        console.error('Failed to upload:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading Post:', error);
    }
  };

  const loadfile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  useEffect(() => {
    fetchUserdata();
  }, []);
  return (
    <>
      <Navbar />
      <div className='createPost'>
        {/* //header */}
        {postSuccess ? (
          <div className='success-box'>
            <img src={doneImg} alt='Done' className='done-img' />
            <h2>Posted Successfully</h2>
          </div>
        ) : (
          <div className=''>
            <div className='post-header'>
              <h4 style={{ margin: '3px auto' }}>Create New Post</h4>
              <button
                className='post-btn'
                onClick={() => {
                  handleSubmit();
                }}
              >
                Share
              </button>
            </div>
            {/* image preview */}
            <div className='main-div'>
              <img
                id='output'
                src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png'
                alt='post'
              />
              <input
                id='chooseFile'
                type='file'
                accept='image/*'
                onChange={(event) => {
                  loadfile(event);
                  setImage(event.target.files[0]);
                }}
              />
            </div>
            {/* details */}
            <div className='details'>
              <div className='card-header'>
                <div className='card-pic'>
                  <img src={userData.profilePic} alt='' />
                </div>
                <h5>{userData.username}</h5>
              </div>
              <div className='caption'>
                <textarea
                  type='text'
                  placeholder='Write a caption....'
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreatePost;
