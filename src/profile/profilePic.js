import { React, useState } from 'react';
import { FaCamera } from 'react-icons/fa'; // Import an icon from a library (e.g., react-icons)

const ProfilePic = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpdateProfile = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append('file', selectedFile);
    console.log(selectedFile, 'file');

    console.log(formData);
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
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
      } else {
        console.error('Failed to upload file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const handleFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);

    handleUpdateProfile();
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
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the file input
      />
    </>
  );
};

export default ProfilePic;
