

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './index1.css';
import LoginValidation from '../LoginValidation';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(LoginValidation(values));
        axios.post('http://localhost:3000/api/auth/login',values)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/home');
            }
        }).catch((err) => {
            console.log(err)
            setErrorMessage('Invalid email or password');
        })
    }

     
    return (
        <div className="App">
            <h1 style={{ color: "red" }}>USER LOGIN</h1>
            <form onSubmit={handleSubmit} className="formcontainer">
                <div className='action'>
                    <label className="label" htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input
                        onChange={handleChange}
                        name="email"
                        className='input'
                        type="email"
                        placeholder='Enter Email'
                    />
                    {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                </div>
                <div className='action'>
                    <label className="label" htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input
                        onChange={handleChange}
                        className='input'
                        name="password"
                        type="password"
                        placeholder='Enter Password'
                    />
                    {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                </div>
                <button className='button' type="submit">Login</button>
                <p className='para'>{errorMessage}</p>
                <p className='para'>You agree to our terms & conditions</p>
                <Link to='/signup'><button className='buttons' type="button">Create Account</button></Link>
            </form>
        </div>
    );
}

export default Login;
