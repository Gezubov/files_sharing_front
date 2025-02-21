import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ margin: '10px' }}>
        <CardContent>
          <Typography variant="h6">ID: {user.id}</Typography>
          <Typography variant="body1">Username: {user.username}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default UserCard 