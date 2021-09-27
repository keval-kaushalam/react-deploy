import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link, CssBaseline, Paper} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import CopyRight from './CopyRight'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const theme = createTheme();
const SignIn = () => {

    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email:"",
        password:"",
        errors_list: []
    })

    const validationSchema = Yup.object().shape({
        email : Yup.string().required('Please Enter Email Address.').email('Please Enter Valid Email Address.'),
        password: Yup.string().required('Please Enter Password.')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({resolver: yupResolver(validationSchema)})

    const onSubmit = (data) => {
        
        axios.get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`).then(response => {
            axios.post(`${process.env.REACT_APP_API_URL}/api/login`,data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token',res.data.token)
                    localStorage.setItem('auth_user',JSON.stringify(res.data))
                    // swal("Success",res.data.success,"success")
                    history.push('/')
                }else if(res.data.status === 401){
                    swal("Warning",res.data.message,"warning")
                }else{
                    setLogin({...loginInput, errors_list: res.data.validation_error})
                }
            });
        });
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} autoComplete="off">
                                <TextField
                                    {...register('email')}
                                    error={errors.email ? errors.email: loginInput.errors_list.email}
                                    helperText={errors.email ? errors.email?.message : loginInput.errors_list.email ? loginInput.errors_list.email[0]: '' }
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    {...register('password')}
                                    error={errors.password ? errors.password: loginInput.errors_list.password}
                                    helperText={errors.password ? errors.password?.message : loginInput.errors_list.password ? loginInput.errors_list.password[0]: '' }
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <CopyRight sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    )
}

export default SignIn
