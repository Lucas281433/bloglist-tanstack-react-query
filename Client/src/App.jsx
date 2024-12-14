import { useState, useEffect } from 'react'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue, useUserDispatch } from './UserContext'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  AppBar,
  MenuItem,
  Stack,
  Toolbar,
  Button,
  Avatar,
} from '@mui/material'

import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import Users from './components/Users/Users'
import User from './components/User/User'
import Blog from './components/Blog/Blog'
import avatar from './assets/user-avatar.webp'

import blogService from './services/blogs'
import loginService from './services/login'

import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded'

/**
 * App is the main component of the application.
 * It renders the main menu and the content depending on the current user.
 * If the user is not logged in, it renders the LoginForm.
 * If the user is logged in, it renders a menu with links to the Blogs, Users, and Logout
 * and a content area that displays the selected page.
 * The content area is a Router that renders the selected page depending on the path.
 * The pages are Home, Users, User, and Blog.
*/
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useUserValue()
  const dispatchUser = useUserDispatch()
  const dispatchNotification = useNotificationDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [dispatchUser])

  /**
  * Handles the login process for a user.
  * Prevents the default form submission, logs the user in using
  * the provided username and password, stores the user information
  * in local storage, sets the authentication token for the blog service,
  * updates the user state, and clears the input fields.
  * If an error occurs, displays a notification for incorrect credentials.
  *
  * @param {Event} event - The form submission event.
  */
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogListAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatchUser({ type: 'SET_USER', payload: user })
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatchNotification({
        type: 'SHOW_NOTIFICATION',
        payload: 'Wrong Username or Password',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    }
  }

  /**
   * Logs the user out of the application.
   * Removes the user information from local storage
   * and updates the user state to null.
   */
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    dispatchUser({ type: 'SET_USER', payload: null })
  }

  if (user === null) {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100dvh"
      >
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </Stack>
    )
  }

  return (
    <Router>
      <AppBar
        position="static"
        className='menu'
      >
        <Toolbar>
          <MenuItem>
            <Link to="/" className='text-decoration'>
              Blogs
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/users" className='text-decoration'>
              Users
            </Link>
          </MenuItem>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            flexGrow={1}
            gap={1}
          >
            <Avatar src={avatar} />
            <Stack direction="row" alignItems="center" flexWrap='wrap'>
              {user.name} Logged In
              <MenuItem>
                <Button
                  variant="contained"
                  color="error"
                  size='small'
                  onClick={handleLogout}
                >
                  <PersonOffRoundedIcon fontSize="small" />
                  Logout
                </Button>
              </MenuItem>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Router>
  )
}

export default App
