import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import RefreshIcon from '@mui/icons-material/Refresh';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import axios from 'axios'
import CopyRight from './CopyRight'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const theme = createTheme();
const SignUp = () => {
    const history = useHistory();
    const [registerInput, setRegisterInput] = useState({
        firstname:'',
        lastname:'',
        email:"",
        errors_list: []
    })

    const validationSchema = Yup.object().shape({
        firstname : Yup.string()
            .required('First Name is required.'),
        lastname : Yup.string()
            .required('Last Name is required.'),
        email : Yup.string()
            .required("Email is required.")
            .email("Email is invalid."),
        password : Yup.string()
            .required("Password is required.")
            .min(6, "Password must be at least 6 characters")
            .max(40, "Password must not exceed 40 characters"),
        confirmpassword : Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref('password'), null], "Confirm Password does not match.")
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({resolver: yupResolver(validationSchema)})

    const onSubmit = (data) => {
        axios.get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`).then(response => {
            axios.post(`${process.env.REACT_APP_API_URL}/api/register`,data).then(res => {
                if(res.data.status === 200){

                    localStorage.setItem('auth_token',res.data.token)
                    localStorage.setItem('auth_user',JSON.stringify(res.data))
                    // swal("success",res.data.success,"Success")
                    history.push('/')
                }else{
                    setRegisterInput({...registerInput, errors_list: res.data.validation_error})
                }
            });
        });
    }

    return(
        <>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{ 
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Avatar sx={{m : 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt:3 }} autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    {...register('firstname')}
                                    error={errors.firstname ? errors.firstname: registerInput.errors_list.firstname}
                                    helperText={errors.firstname ? errors.firstname?.message : registerInput.errors_list.firstname ? registerInput.errors_list.firstname[0]: '' }
                                    autoComplete="fname"
                                    name="firstname"
                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...register('lastname')}
                                    error={errors.lastname ? errors.lastname: registerInput.errors_list.lastname}
                                    helperText={errors.lastname ? errors.lastname?.message : registerInput.errors_list.lastname ? registerInput.errors_list.lastname[0]: '' }
                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('email')}
                                    error={errors.email ? errors.email: registerInput.errors_list.email}
                                    helperText={errors.email ? errors.email?.message : registerInput.errors_list.email ? registerInput.errors_list.email[0]: '' }
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('password')}
                                    error={errors.password ? errors.password: registerInput.errors_list.password}
                                    helperText={errors.password ? errors.password?.message : registerInput.errors_list.password ? registerInput.errors_list.password[0]: '' }
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('confirmpassword')}
                                    error={errors.confirmpassword}
                                    helperText={errors.confirmpassword?.message}
                                    fullWidth
                                    name="confirmpassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmpassword"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" name="allowemail" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                            <Grid item xs={12} style={{display:'flex'}}>
                                <Button type="Submit" fullWidth variant="contained" sx={{ mt:3, mb:2 }}>Sign Up</Button>
                                <Button type="button" onClick={() => reset()} variant="contained" sx={{ mt:3, mb:2, ml:2 }}><RefreshIcon /></Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <CopyRight sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
        </>
    )
}

export default SignUp
