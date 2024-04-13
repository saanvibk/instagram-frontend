import { React, useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa'; // Import an icon from a library (e.g., react-icons)
import { useNavigate } from 'react-router-dom';

const ProfilePic = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedFile) {
      handleUpdateProfile();
    }
  }, [selectedFile]);

  const handleUpdateProfile = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append('file', selectedFile);

    console.log('file', selectedFile);
    console.log(formData);

    if (selectedFile == '') {
      return;
    }

    try {
      // Send a POST request with Fetch API
      const response = await fetch(
        'http://localhost:6500/user/uploadProfilePic',
        {
          method: 'POST',
          body: formData, // Pass the FormData object as the request body
          credentials: 'include', // Include credentials (cookies)
        },
      );

      // Handle response
      if (response.status === 401) {
        navigate('/');
      }
      if (response.status === 200) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
      } else {
        console.error('Failed to upload profile picture:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <label htmlFor='fileInput' className='icon-label'>
        <FaCamera className='upload-icon' />
      </label>
      <input
        type='file'
        id='fileInput'
        accept='image/*' // Specify accepted file types if needed
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
        }}
        style={{ display: 'none' }} // Hide the file input
      />
    </>
  );
};

export default ProfilePic;
