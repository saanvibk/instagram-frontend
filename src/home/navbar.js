import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ig-logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const fetchLogout = async () => {
    try {
      const data = await fetch('http://localhost:6500/auth/logout', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include', // Include credentials (cookies)
      });
      const status = data.status;
      const res = await data.json();
      console.log(status, res);

      if (status === 200) {
        toast.success(res.msg);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
      if (status === 401) {
        navigate('/');
        toast.error(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='navbar'>
      <img src={logo} alt='' />
      <ul className='nav-menu'>
        <Link to='/profile'>
          <li>Profile</li>
        </Link>
        <Link to='/createPost'>Create Post</Link>
      </ul>
      <button className='primaryBtn' onClick={() => fetchLogout()}>
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
