// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/ig-logo.png';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let error = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:6500/auth/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include credentials (cookies)
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 401) {
          console.log('email');
          const emailError = 'Email is not Registered';
        }

        if (res.status === 400) {
          const passwordError = 'Passwor Incorrect';
        }

        if (res.status === 200) {
          navigate('/home');
        }
      })

      .catch((err) => console.log(err));
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
      </form>
    </div>
  );
};

export default LoginForm;
