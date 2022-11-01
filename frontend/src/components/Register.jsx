import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/userContext';

const BASE_URL = 'http://localhost:5000';

const Register = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(UserContext);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    Cpassword: '',
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.Cpassword) {
      return toast.error('Passwords does not match');
    }
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      }),
    });
    const json = await response.json();
    if (response.status !== 200) {
      toast.error(json.error);
    } else {
      toast.success(json.MESSAGE);
      navigate('/login');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='card'>
        <h2>Register</h2>
        <input
          type='text'
          onChange={onChange}
          name='firstName'
          placeholder='First Name'
          required
        />
        <input
          type='text'
          onChange={onChange}
          name='lastName'
          placeholder='Last Name'
          required
        />
        <input
          type='email'
          onChange={onChange}
          name='email'
          placeholder='Email'
          required
        />
        <input
          type='password'
          onChange={onChange}
          name='password'
          placeholder='Password'
          required
        />
        <input
          type='password'
          onChange={onChange}
          name='Cpassword'
          placeholder='Confirm Password'
          required
        />
        <button>Register</button>
        <p className='msg'>
          Already have an account ?
          <span>
            <Link to='/login'>Login</Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default Register;
