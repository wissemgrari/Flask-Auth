import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/userContext';

import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const { isAuth, user, dispatch } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      toast.success('Login successful', { toastId: user.id });
    }
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, user]);

  const handleLogout = () => {
    dispatch({ type: 'LOG_OUT' });
  };

  return (
    <div className='card'>
      <h2>
        Welcome {user?.firstName} {user?.lastName}
      </h2>
      <div className='info'>
        <div>
          <label>ID: </label>
          <p>{user?.id}</p>
        </div>
        <div>
          <label>First Name: </label>
          <p>{user?.firstName}</p>
        </div>
        <div>
          <label>Last Name: </label>
          <p>{user?.lastName}</p>
        </div>
        <div>
          <label>Email: </label>
          <p>{user?.email}</p>
        </div>
        <div>
          <label>Password: </label>
          <p>{user?.password}</p>
        </div>
      </div>
      <div className='logout' onClick={handleLogout}>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Home;
