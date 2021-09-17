import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const SignUp = () => {

    const validationSchema = Yup.object().shape({
        fullname : Yup.string()
            .required('Fullname is required.'),
        username : Yup.string()
            .required('Username is required.')
            .min(6, "Username must be at least 6 characters")
            .max(20, "Username must not exceed 20 characters"),
        email : Yup.string()
            .required("Email is required.")
            .email("Email is invalid."),
        password : Yup.string()
            .required("Password is required.")
            .min(6, "Password must be at least 6 characters")
            .max(40, "Password must not exceed 40 characters"),
        confirmpassword : Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref('password'), null], "Confirm Password does not match."),
        acceptterms : Yup.bool().oneOf([true], "Accept Terms is required.")
    });
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({resolver: yupResolver(validationSchema)})
    
    const onSubmit = (data) => {
        // e.preventDefault()
        console.log(JSON.stringify(data, null, 2));
    };

    return (
        <>
            <div className="register-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            {...register('fullname')}
                            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                            name="fullname"></input>
                        <div className="invalid-feedback">{errors.fullname?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            {...register('username')}
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            name="username"></input>
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            {...register('email')}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            name="email"></input>
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            name="password"></input>
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            {...register('confirmpassword')}
                            className={`form-control ${errors.confirmpassword ? 'is-invalid' : ''}`}
                            name="confirmpassword"></input>
                        <div className="invalid-feedback">{errors.confirmpassword?.message}</div>
                    </div>

                    <div className="form-group form-check">
                        <input
                            type="checkbox"
                            {...register('acceptterms')}
                            className={`form-check-input ${errors.acceptterms ? 'is-invalid' : ''}`}
                            name="acceptterms"
                            id="acceptterms"></input>
                        <label htmlFor="acceptterms" className="form-check-label">
                            I have read and agree to the terms
                        </label>
                        <div className="invalid-feedback">{errors.acceptterms?.message}</div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Register</button>
                        <button type="button" onClick={() => reset()} className="btn btn-warning float-right">Reset</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp
