// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ig-logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import FlashMessage from 'react-flash-message';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchData = async () => {
    try {
      const data = await fetch('http://localhost:6500/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include credentials (cookies)
      });

      const status = data.status;
      const res = await data.json();
      console.log(res.msg);

      if (status === 200) {
        toast.success('Login Success');
        navigate('/home');
      }
      if (status >= 400) {
        toast.error(res.msg, {});
      }
    } catch (err) {
      toast.error(err.msg, {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData();
  };

  return (
    <div className='login-container'>
      <img src={logo} alt='' className='logo' />

      <form className='login-form' onSubmit={handleSubmit}>
        <h2 className='login-title'>Login</h2>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='login-input'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='login-input'
        />
        <button type='submit' className='login-button'>
          Log In
        </button>

        <p className='signupText'>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className='signupButton'>
            Sign up
          </span>
        </p>

        <ToastContainer />
      </form>
    </div>
  );
};

export default LoginForm;
