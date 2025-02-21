import { Container } from '@mui/material'
import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Header from './components/Header'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import UserDetail from './components/UserDetail'
import UserList from './components/UserList'

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Container>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:uuid" element={<UserDetail user={user} />} />
          <Route path="/auth/login" element={<SignIn setUser={setUser} />} />
          <Route path="/auth/register" element={<SignUp />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
