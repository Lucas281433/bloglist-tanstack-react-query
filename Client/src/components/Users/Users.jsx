import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Stack, Table, TableBody, TableCell, TableRow } from '@mui/material'

import usersServices from '../../services/users'

import usersImage from '../../assets/users.jpg'
import './Users.css'

/**
 * Component to show a table of all users in the database.
 * Each row in the table shows the name of the user and the number of blogs they have created.
 * The user names are links to the user's info page.
 */
const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: usersServices.getAll,
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const users = result.data

  return (
    <Stack direction="column" alignItems="center">
      <h2>Users</h2>
      <img src={usersImage} className='users-image' />
      <Table className='users-table'>
        <TableBody>
          <TableRow >
            <TableCell></TableCell>
            <TableCell className='text'>Blogs Created</TableCell>
          </TableRow>
          {users.map((user) => (
            <TableRow key={user.id} >
              <TableCell className='users-table text' ><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
              <TableCell className='users-table text'>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  )
}

export default Users
