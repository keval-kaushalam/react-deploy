import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Box, Avatar, Typography, Grid, TextField, FormControlLabel, Checkbox, Button, Link, ButtonGroup} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import RefreshIcon from '@mui/icons-material/Refresh';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { width } from '@mui/system'



function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const theme = createTheme();





const SignUp = () => {

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
        console.log(data)
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
                    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt:3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    {...register('firstname')}
                                    error={errors.firstname}
                                    helperText={errors.firstname?.message}
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
                                    error={errors.lastname}
                                    helperText={errors.lastname?.message}
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
                                    error={errors.email}
                                    helperText={errors.email?.message}
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
                                    error={errors.password}
                                    helperText={errors.password?.message}
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
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
        </>
    )
}

export default SignUp
