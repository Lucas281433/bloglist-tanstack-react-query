import {
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material'

import Notification from '../Notification/Notification'
import PropTypes from 'prop-types'
import loginImage from '../../assets/login.jpg'
import './LoginForm.css'

/**
 * LoginForm is a component that renders a login form.
 * It accepts four props: `handleLogin`, `username`, `password`,
 * and `handleUsernameChange` and `handlePasswordChange`.
 * The form includes fields for the username and password,
 * and a button to submit the form. Upon submission, it triggers
 * the `handleLogin` function with the entered details.
 *
 * @param {Function} handleLogin - Function to handle the login
 * @param {String} username - The username to display in the form
 * @param {String} password - The password to display in the form
 * @param {Function} handleUsernameChange - Function to handle the change of the username
 * @param {Function} handlePasswordChange - Function to handle the change of the password
 */
const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    /* The input-style and button-style classes are in index.css*/
    <Stack>
      <Notification />
      <Card className="card">
        <Stack direction="row" alignItems="center">
          <CardContent>
            <h2>Log in to Application</h2>
            <form onSubmit={handleLogin}>
              <div>
                <TextField
                  variant="outlined"
                  label="Username"
                  type="text"
                  size="small"
                  value={username}
                  name="username"
                  onChange={handleUsernameChange}
                  id="username"
                  className="input-style input-margin"
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  size="small"
                  value={password}
                  name="password"
                  onChange={handlePasswordChange}
                  id="password"
                  className="input-style input-margin"
                />
              </div>
              <Stack>
                <Button
                  variant="contained"
                  className="button-style"
                  type="submit"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </CardContent>
          <img
            src={loginImage}
            width="210"
            height="270"
          />
        </Stack>
      </Card>
    </Stack>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
