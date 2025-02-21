import { Container, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log('Запрос на получение пользователей...')
    axios.get('http://localhost:8081/users')
      .then(response => {
        const sortedUsers = response.data.sort((a, b) => a.id - b.id)
        setUsers(sortedUsers)
      })
      .catch(error => console.error('Ошибка при получении пользователей:', error))
  }, [])

  return (
    <Container>
      <Typography variant="h6">Users List:</Typography>
      <ul>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </Container>
  )
}

export default UserList 