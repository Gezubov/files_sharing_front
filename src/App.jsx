import { Container } from '@mui/material'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Header from './components/Header'
import SignUp from './components/SignUp'
import UserDetail from './components/UserDetail'
import UserList from './components/UserList'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
