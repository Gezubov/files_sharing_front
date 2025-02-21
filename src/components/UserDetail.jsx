import { Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserDetail = ({ user, setUser }) => {
  const { uuid } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:8081/user/${uuid}`)
      .then(response => {
        setUserData(response.data)
        setUsername(response.data.username)
        setEmail(response.data.email)
      })
      .catch(error => {
        console.error('Ошибка при получении информации о пользователе:', error)
        setError('Не удалось загрузить данные пользователя.')
      })
  }, [uuid])

  const handleUpdate = () => {
    const updatedUser = {}
    
    // Добавляем только непустые поля
    if (username.length > 0) {
      updatedUser.username = username
    }
    if (email.length > 0) {
      updatedUser.email = email
    }
    if (password.length > 0) {
      updatedUser.password = password
    }

    // Проверяем, есть ли что-то для обновления
    if (Object.keys(updatedUser).length > 0) {
      axios.patch(`http://localhost:8081/user/${uuid}`, updatedUser, {
        withCredentials: true
      })
        .then(response => {
          setUserData(response.data)
          setError(null)
        })
        .catch(error => {
          console.error('Ошибка при обновлении данных пользователя:', error)
          setError('Не удалось обновить данные пользователя.')
        })
    } else {
      setError('Нет данных для обновления.')
    }
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:8081/user/${uuid}`, {
      withCredentials: true
    })
      .then(response => {
        // Проверяем статус ответа
        if (response.status === 204) {
          setUser(null) // Устанавливаем пользователя в null
          Cookies.remove('token') // Удаляем токен из куки
          navigate('/users') // Перенаправляем на список пользователей
        } else {
          setError('Не удалось удалить пользователя.')
        }
      })
      .catch(error => {
        console.error('Ошибка при удалении пользователя:', error)
        setError('Не удалось удалить пользователя.')
      })
  }

  if (error) return <Typography color="error">{error}</Typography>
  if (!userData) return <Typography>Loading...</Typography>

  return (
    <Container>
      <Typography variant="h4">User Detail</Typography>
      <Typography variant="h6">UUID: {userData.uuid}</Typography>
      <Typography variant="body1">Username: {userData.username}</Typography>
      <Typography variant="body1">Email: {userData.email}</Typography>
      <Typography variant="body1">Role: {userData.role}</Typography>
      
      {/* Показываем поля редактирования только если текущий пользователь является владельцем */}
      {user && user.uuid === userData.uuid && (
        <>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
          <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</Button>
        </>
      )}
    </Container>
  )
}

export default UserDetail 