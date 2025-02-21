import { Container, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const { id } = useParams() // Получаем id из параметров маршрута
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8081/user/${id}`)
      .then(response => {
        setUser(response.data)
      })
      .catch(error => {
        console.error('Ошибка при получении информации о пользователе:', error)
      })
  }, [id])

  if (!user) return <Typography>Loading...</Typography>

  return (
    <Container>
      <Typography variant="h4">User Detail</Typography>
      <Typography variant="h6">ID: {user.id}</Typography>
      <Typography variant="body1">Username: {user.username}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      {/* Здесь можно добавить другие поля пользователя */}
    </Container>
  )
}

export default UserDetail 