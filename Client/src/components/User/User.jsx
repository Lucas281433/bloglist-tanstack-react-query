import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Avatar, List, ListItem, ListItemIcon, Stack } from '@mui/material'

import usersServices from '../../services/users'

import MarkChatReadRoundedIcon from '@mui/icons-material/MarkChatReadRounded'
import avatarImage from '../../assets/user-avatar.webp'
import './User.css'

/**
 * A component for showing a specific user.
 * This component expects a URL parameter 'id' that is the id of the user to show.
 * It fetches the users from the server and then shows the user with the given id.
 * If no user with the given id is found, it returns null.
 * If the user is found, it shows the user's name, avatar and the blogs added by the user.
 * @returns {JSX.Element} A JSX element containing the user's information.
 */
const User = () => {
  const { id } = useParams()
  const result = useQuery({
    queryKey: ['users', id],
    queryFn: usersServices.getAll,
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const user = result.data.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Avatar
          src={avatarImage}
          className='user-avatar'
        />
        <h1>{user.name}</h1>
      </Stack>
      <Stack direction="column" alignItems="center">
        <h2>Added Blogs</h2>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <ListItemIcon>
                <MarkChatReadRoundedIcon className='user-icon' />
              </ListItemIcon>
              {blog.title}
            </ListItem>
          ))}
        </List>
      </Stack>
    </div>
  )
}

export default User
