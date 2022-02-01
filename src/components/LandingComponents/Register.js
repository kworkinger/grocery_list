import React from 'react';
import { useFormik } from 'formik'
import axios from 'axios'

function Register() {
    const initialValues = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        bio: "",
        DOB: "",
        photo:"",
        password: "",
        confirmPassword: ""
    }
    const onSubmit = (values) => {
        axios.post('http://localhost:4000/register', values)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('user_id', res.data[0][0].user_id)
            localStorage.setItem('firstName', res.data[0][0].firstname)
            localStorage.setItem('lastName', res.data[0][0].lastname)
            localStorage.setItem('username', res.data[0][0].username)
            localStorage.setItem('bio', res.data[0][0].bio)
            localStorage.setItem('DOB', res.data[0][0].dob)
            localStorage.setItem('photo', res.data[0][0].photo)
        })
        .catch(err => console.log(err.response.data))
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
        if(!values.firstName) {
            errors.firstName = "First name is required"
        }
        if(!values.lastName) {
            errors.lastName = "Last name is required"
        }
        if(!values.confirmPassword) {
            errors.confirmPassword = "Please confirm password"
        } else if(values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords must match"
        }
        return errors
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
  
  
  return <div className='register'>
      <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder='Username'
            />
            <input
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                placeholder='First Name'
            />
            <input
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder='Last Name'
            />
            <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder='Email'
            />
            <input
                type="text"
                name="bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
                placeholder='Short Bio'
            />
            <input
                type="date"
                name="DOB"
                onChange={formik.handleChange}
                value={formik.values.DOB}
                placeholder='Date of Birth'
            />
            <input
                type="image"
                name="profilePhoto"
                alt="Profile Photo"
                onChange={formik.handleChange}
                value={formik.values.photo}
                placeholder="Your Photo"
            />
            <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
            />
            <input
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder='Confirm Password'
            />
            <button type="submit" disabled={!formik.isValid}>Submit</button>
        </form>
        <div>
            {formik.errors.username ? <div>{formik.errors.username}</div> : null}
            {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
            {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            {formik.errors.bio ? <div>{formik.errors.bio}</div> : null}
            {formik.errors.DOB ? <div>{formik.errors.DOB}</div> : null}
            {formik.errors.photo ? <div>{formik.errors.photo}</div> : null}
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
        </div>
  </div>;
}

export default Register;
