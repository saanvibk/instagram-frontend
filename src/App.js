import Register from './authentication/signup';
import HomePage from './home/home';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './authentication/login';
import Profile from './profile/profilePage';

const InstagramSignup = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Register />} />

      <Route path='/home' element={<HomePage />} />

      <Route path='/profile' element={<Profile />} />

      <Route path='/' element={<LoginForm />} />
    </Routes>
  );
};

export default InstagramSignup;
