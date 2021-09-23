import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {/* News */}
                        </Typography>
                        <Link to='/signin'>
                            <Button style={{color:'white'}}>Sign In</Button>
                        </Link>
                        <Link to='/signup'>
                            <Button style={{color:'white'}}>Sign Up</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default NavBar
