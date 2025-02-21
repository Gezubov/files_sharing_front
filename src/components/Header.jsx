import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Files Storage
        </Typography>
        <Button color="inherit" component={Link} to="/">Sign Up</Button>
        <Button color="inherit" component={Link} to="/users">User List</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header 