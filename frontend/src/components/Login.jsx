import React, { useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/userContext';

const BASE_URL = 'http://localhost:5000';

const Login = () => {
  const { isAuth, error, dispatch } = useContext(UserContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    const json = await response.json();
    if (response.status !== 200) {
      dispatch({ type: 'SET_ERROR', payload: json });
    } else {
      dispatch({ type: 'LOG_IN', payload: json.user });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, { toastId: Math.floor(Math.random() * 1000) });
    }
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, error]);

  return (
    <form className='login-form' onSubmit={handleLogin}>
      <div className='card'>
        <h2>Login</h2>
        <input ref={emailRef} type='email' placeholder='Email' required />
        <input
          ref={passwordRef}
          type='password'
          placeholder='Password'
          required
        />
        <button>LOGIN</button>
        <p className='msg'>
          Don't have an account ?
          <span>
            <Link to='/register'>Register</Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
