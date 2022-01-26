import React from 'react';
import { useFormik } from 'formik'
import axios from 'axios'
// import { useNavigate } from "react-router-dom"
import Register from './Register';

function Login(props) {
    const initialValues = {
        username: "",
        password: ""
    }
    const onSubmit = (values) => {
        axios.post('/login', values)
        .then(res => {
            localStorage.setItem('firstName', res.data.firstName)
            localStorage.setItem('lastName', res.data.lastName)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('bio', res.data.bio)
            localStorage.setItem('DOB', res.data.DOB)
            localStorage.setItem('photo', res.data.photo)
            props.loginFunction()
            // navigate('/Landing')
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }
    const validate = (values) => {
        const errors = {}
        if(!values.username) {
            errors.username = "Username Required"
        }
        if(!values.password) {
            errors.password = "Password Required"
        } else if (values.password.length < 7) {
            errors.password = "Password must be longer than 7 characters."
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return <div>
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder='Username'
            />
            <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
            />
            <button type="submit" disabled={formik.isValid}>Submit</button>
        </form>
        <small>Not a user? Click here to register.</small>
        <button onClick={<Register />}>Register</button>
    </div>;
}

export default Login;


