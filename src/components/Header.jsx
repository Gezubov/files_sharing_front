import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ user, setUser }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    Cookies.remove('token')
    navigate('/auth/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Files Storage
        </Typography>
        {user ? (
          <>
            <Typography variant="body1" style={{ marginRight: '10px' }}>{user.username}</Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/auth/register">Sign Up</Button>
            <Button color="inherit" component={Link} to="/auth/login">Sign In</Button>
          </>
        )}
        <Button color="inherit" component={Link} to="/users">User List</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header 