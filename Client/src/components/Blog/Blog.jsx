import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Stack,
  Card,
  CardContent,
  List,
  ListItem,
  Button,
  ListItemIcon,
  TextField,
} from '@mui/material'

import blogService from '../../services/blogs'
import './Blog.css'

import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded'
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded'
import commentsImage from '../../assets/comments.png'

/**
 * Component for showing a blog post with its comments.
 * @param {string} id - The id of the blog post to show.
 * @returns {JSX.Element} A JSX element containing the blog post and its comments.
 */
const Blog = () => {
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  /**
   * onSuccess callback for addLikeMutation.
   * Updates the cache of the list of blogs with the new number of likes.
   * @param {Object} blog - The blog post with its updated likes property.
   * @returns {void}
   */
  const addLikeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlog = blogs.map((b) =>
        b.id === blog.id ? { ...b, likes: b.likes + 1 } : b,
      )
      queryClient.setQueryData(['blogs'], updatedBlog)
    },
  })

  /**
   * onSuccess callback for removeBlogMutation.
   * Invalidates the cache of the list of blogs so that it will be refetched
   * from the server when it is accessed again.
   * @returns {void}
  */
  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  /**
   * onSuccess callback for addCommentMutation.
   * Updates the cache of the list of blogs with the new comment.
   * @param {Object} updatedBlog - The blog post with its updated comments property.
   * @returns {void}
  */
  const addCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const newBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      )
      queryClient.setQueryData(['blogs'], newBlogs)
    },
  })

  /**
   * Asynchronously updates the server with a new number of likes for the given blog.
   * Also updates the cache of the list of blogs with the new number of likes.
   * @param {Object} blog - The blog post with its likes property.
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   */
  const addLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    addLikeMutation.mutate(updatedBlog)
  }

  /**
   * Asynchronously removes the blog post with the given id from the server.
   * Also invalidates the cache of the list of blogs so that it will be refetched
   * from the server when it is accessed again. If the user confirms the removal,
   * the user is navigated to the home page.
   * @param {string} id - The id of the blog post to remove.
   * @returns {Promise<void>} A promise that resolves when the removal is complete.
   */
  const removeBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (
      window.confirm(
        `Remove Blog ${blogToDelete.title} By ${blogToDelete.author}`,
      )
    ) {
      removeBlogMutation.mutate(id)
      navigate('/')
    }
  }

  /**
   * Asynchronously adds a comment to the blog post with the given id.
   * Also resets the comment input field.
   * @param {Event} event - The event that triggered the addition of a comment.
   * @returns {Promise<void>} A promise that resolves when the addition is complete.
   */
  const addComment = async (event) => {
    event.preventDefault()
    addCommentMutation.mutate({ id: blog.id, comment })
    setComment('')
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const blogs = result.data
  const blog = blogs?.find((blog) => blog.id === id)

  return (
    /* The input-style and button-style classes are in index.css*/
    <Stack direction="column" alignItems="center">
      <Card className="blog-card">
        <CardContent>
          <Stack direction="column" alignItems="center">
            <h1>
              {blog.title} {blog.author}
            </h1>
            <p>
              <strong>Url:</strong>{' '}
              <a href={blog.url} target="blank">
                {blog.url}
              </a>
            </p>
            <p>
              <strong>Likes:</strong> {blog.likes}
              <Button
                variant="contained"
                className="button-style button-like"
                onClick={() => addLike(blog)}
              >
                <ThumbUpRoundedIcon className="like-icon" />
                Like
              </Button>
            </p>
            <p>
              <strong>Added by {blog.user.name}</strong>
            </p>
            <Button
              variant="contained"
              color="error"
              onClick={() => removeBlog(blog.id)}
            >
              <DeleteForeverRoundedIcon /> Remove
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <h2>Comments</h2>
      <Stack direction="row" justifyContent="space-around" alignItems="flex-start" flexWrap="wrap">
        <img src={commentsImage} className="comments-image" />
        <div>
          <form onSubmit={addComment} className="form-position">
            <TextField
              type="text"
              value={comment}
              label="Comment"
              size="small"
              onChange={({ target }) => setComment(target.value)}
              className="input-style"
            />
            <Button variant="contained" className="button-style" type="submit">
              <PostAddRoundedIcon /> Add comment
            </Button>
          </form>

          {blog.comments === undefined ? (
            <p className='no-comments'>No comments yet</p>
          ) : (
            <List>
              {blog &&
                blog.comments.map((comment) => (
                  <ListItem key={comment}>
                    <ListItemIcon>
                      <RateReviewRoundedIcon className="list-icon" />
                    </ListItemIcon>
                    {comment}
                  </ListItem>
                ))}
            </List>
          )}
        </div>
      </Stack>
    </Stack>
  )
}

export default Blog
