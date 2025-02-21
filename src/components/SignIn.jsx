import { Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = ({ setUser }) => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const credentials = { identifier, password }

    axios.post('http://localhost:8081/auth/login', credentials, { withCredentials: true })
      .then(response => {
        console.log('Успешный вход:', response.data)
        Cookies.set('token', response.data.token)
        setUser(response.data)
        navigate(`/user/${response.data.uuid}`)
      })
      .catch(error => {
        console.error('Ошибка при входе:', error)
        setError('Неверные учетные данные. Попробуйте еще раз.')
      })
  }

  return (
    <Container>
      <Typography variant="h4">Sign In</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username or Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Sign In</Button>
      </form>
    </Container>
  )
}

export default SignIn
