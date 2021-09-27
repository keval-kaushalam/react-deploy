import React from 'react'
import AppBar from '@mui/material/AppBar'
import { Box, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'

const NavBar = () => {

    var AuthButtons = ""
    const history = useHistory();

    const logoutSubmit = () =>{

        axios.get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`).then(response => {
            axios.post(`${process.env.REACT_APP_API_URL}/api/logout`).then(res => {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_user')
                swal("Success",res.data.message,"success")
                history.push('/signin')
            })
        })
    }

    if(!localStorage.getItem('auth_token')){
        AuthButtons = (
            <>
                <Link to='/signin'>
                    <Button style={{color:'white'}}>Sign In</Button>
                </Link>
                <Link to='/signup'>
                    <Button style={{color:'white'}}>Sign Up</Button>
                </Link>
            </>
        )
    }else{
        AuthButtons = (
            <>
                <Button style={{color:'white'}} onClick={logoutSubmit}>Logout</Button>
            </>
        )
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        {AuthButtons}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default NavBar
