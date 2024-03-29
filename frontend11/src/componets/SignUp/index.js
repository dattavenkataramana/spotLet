import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import './index.css';
import LoginValidation from '../LoginValidation';

function SignUp() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        mobileNUmber: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = LoginValidation(values);
        setErrors(validationErrors);

        if (Object.values(validationErrors).every(error => error === "")) {
            const url = "http://localhost:3000/api/auth/signup";
            try {
                const response = await axios.post(url, values);  
                console.log(response.data);
                setValues({ firstName: '', lastName: '', mobileNUmber: '', email: '', password: '' });
                navigate("/");
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log("Form has errors, cannot submit.");
        }
    };

    return (
        <div className="App">
            <h1 style={{ color: "red" }}>Sign Up</h1>
            <form onSubmit={handleSubmit} className="formcontainer">
                <div className='action'>
                    <label className="label" htmlFor="firstName">
                        FirstName
                    </label>
                    <input onChange={handleChange} className='input' type="text" placeholder='Enter FirstName' name="firstName" value={values.firstName} />
                    {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}
                </div>
                <div className='action'>
                    <label className="label" htmlFor="lastName">
                        LastName
                    </label>
                    <input onChange={handleChange} className='input' type="text" placeholder='Enter  LastName' name="lastName" value={values.lastName} />
                    {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}
                </div>
                <div className='action'>
                    <label className="label" htmlFor="mobileNUmber">
                        MobileNumber
                    </label>
                    <input onChange={handleChange} className='input' type="text" placeholder='Enter MobileNumber' name="mobileNUmber" value={values.mobileNUmber} />
                    {errors.mobileNUmber && <span style={{ color: "red" }}>{errors.mobileNUmber}</span>}
                </div>
                <div className='action'>
                    <label className="label" htmlFor="email">
                        Email
                    </label>
                    <input onChange={handleChange} className='input' type="email" placeholder='Enter Email' name="email" value={values.email} />
                    {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                </div>
                <div className='action'>
                    <label className="label" htmlFor="password">
                        Password
                    </label>
                    <input onChange={handleChange} className='input' type="password" placeholder='Enter Password' name="password" value={values.password} />
                    {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                </div>
                <button className='button' type='submit'>Sign Up</button>
                <p className='para'>You are agreeing to our terms & conditions</p>
            </form>
        </div>
    );
}

export default SignUp;