import Register from './authentication/signup';
import HomePage from './home/home';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './authentication/login';
import Profile from './profile/profilePage';
import CreatePost from './profile/CreatePost';

const InstagramSignup = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginForm />} />

      <Route path='/signup' element={<Register />} />

      <Route path='/home' element={<HomePage />} />

      <Route path='/profile' element={<Profile />} />

      <Route path='/createPost' element={<CreatePost />} />
    </Routes>
  );
};

export default InstagramSignup;
