import Register from './register';
import HomePage from './home';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './login';

const InstagramSignup = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Register />} />

      <Route path='/home' element={<HomePage />} />

      <Route path='/login' element={<LoginForm />} />
    </Routes>
  );
};

export default InstagramSignup;
