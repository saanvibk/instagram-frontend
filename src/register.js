import React, { useState } from 'react';
import logo from './assets/ig-logo.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, fullname, username, password);
    await fetch('http://localhost:6500/auth/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, fullname, username, password }),
      credentials: 'include', // Include credentials (cookies)
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='signup-container'>
      <img src={logo} alt='' className='logo' />

      <div className='signup-form'>
        <form onSubmit={handleSubmit}>
          <h2 className='createAccount-title'>Create Account</h2>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='fullname'
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder='Full name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>

          <button type='submit'> Sign Up</button>

          <p className='loginText'>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className='loginButton'>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
