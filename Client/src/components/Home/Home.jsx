import { useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../../NotificationContext'
import { useUserValue } from '../../UserContext'
import { Stack } from '@mui/material'

import Notification from '../Notification/Notification'
import Togglable from '../Togglable/Togglable'
import BlogForm from '../BlogForm/BlogForm'
import Blogs from '../Blogs/Blogs'
import blogsImage from '../../assets/blogs.webp'
import './Home.css'

import blogService from '../../services/blogs'

/**
 * Home component that displays a list of blogs and allows the user to add new blogs.
 * Utilizes React Query for fetching and mutating blog data and displays notifications.
 *
 * @returns {JSX.Element} A JSX element containing the blog list, notification, and blog form.
 */
const Home = () => {
  const user = useUserValue()
  const dispatchNotification = useNotificationDispatch()
  const blogFormRef = useRef()

  const queryClient = useQueryClient()

  /**
   * Callback function for when a blog is successfully added.
   * Updates the cache of the list of blogs with the new blog.
   * @param {Object} newBlog - The new blog that was added.
  */
  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const blogWithUser = {
        ...newBlog,
        user: {
          username: user.username,
          name: user.name,
          id: user.id,
        },
      }
      queryClient.setQueryData(['blogs'], blogs.concat(blogWithUser))
    },
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>Loading Data...</div>
  }

  /**
   * Asynchronously adds a new blog post by mutating the blog data.
   * Toggles the visibility of the blog form and dispatches notifications
   * to inform the user of the addition or any errors encountered.
   *
   * @param {Object} newBlog - The new blog to be added, containing title and author.
  */
  const addBlog = async (newBlog) => {
    try {
      addBlogMutation.mutate(newBlog)
      blogFormRef.current.toggleVisibility()

      dispatchNotification({
        type: 'SHOW_NOTIFICATION',
        payload: `A new blog ${newBlog.title} By ${newBlog.author}`,
      })
      setTimeout(() => {
        dispatchNotification({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    } catch (error) {
      dispatchNotification({
        type: 'SHOW_NOTIFICATION',
        payload: 'Error could not create blog',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    }
  }


  const blogs = result.data
  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2 className='home-title'>Blogs</h2>
      <img src={blogsImage} className='home-image' />
      <Notification />
      <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
        <BlogForm newBlog={addBlog} />
      </Togglable>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
      >
        {blogsSorted.map((blog) => (
          <Blogs key={blog.id} blog={blog} />
        ))}
      </Stack>
    </div>
  )
}

export default Home
