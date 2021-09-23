import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link, CssBaseline, Paper} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import CopyRight from './CopyRight'
import axios from 'axios'

const theme = createTheme();
const SignIn = () => {

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
        axios.defaults.withCredentials = true;
        axios.get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`).then(response => {
            axios.post(`${process.env.REACT_APP_API_URL}/login`,data).then(res => {
                console.log(res)
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
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                                <TextField
                                    {...register('email')}
                                    error={errors.email?.message}
                                    helperText={errors.email?.message}
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
                                    error={errors.password}
                                    helperText={errors.password?.message}
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
