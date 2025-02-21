import { Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newUser = { username, password, email }

    axios.post('http://localhost:8081/auth/register', newUser)
      .then(response => {
        console.log('Пользователь создан:', response.data)
        // Здесь можно добавить логику для обработки успешного создания пользователя
      })
      .catch(error => {
        console.error('Ошибка при создании пользователя:', error)
      })
  }

  return (
    <Container>
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
      </form>
    </Container>
  )
}

export default SignUp 