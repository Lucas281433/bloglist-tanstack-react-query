import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

import './BlogForm.css'

/**
 * BlogForm is a component that renders a form for creating a new blog entry.
 * It accepts a single prop, `newBlog`, which is a function to handle the
 * creation of the blog with the given details. The form includes fields for
 * the blog's title, author, and URL. Upon submission, it triggers the
 * `addBlog` function, which prevents the default form behavior, calls the
 * `newBlog` function with the entered details, and resets the form fields.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.newBlog - Function to handle the creation of a new blog
 */
const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  /**
  * Handles the submission of a new blog form.
  * Prevents the default form submission behavior,
  * creates a new blog entry using the provided title,
  * author, and URL, and then resets the form fields.
  *
  * @param {Event} event - The form submission event.
  */
  const addBlog = (event) => {
    event.preventDefault()

    newBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    /*The input-style and button-style classes are in index.css*/
    <form onSubmit={addBlog}>
      <Stack direction="column" gap={1}>
        <h2 className="form-title">Create a new Blog </h2>

        <TextField
          type="text"
          value={title}
          name="title"
          label="Title"
          size="small"
          id="title"
          className="input-style"
          onChange={({ target }) => setTitle(target.value)}
        />

        <TextField
          type="text"
          value={author}
          name="author"
          label="Author"
          size="small"
          id="author"
          className="input-style"
          onChange={({ target }) => setAuthor(target.value)}
        />

        <TextField
          type="text"
          value={url}
          name="url"
          label="Url"
          size="small"
          id="url"
          className="input-style"
          onChange={({ target }) => setUrl(target.value)}
        />

        <Button
          variant="contained"
          type="submit"
          className="button-style createButton"
        >
          Create
        </Button>
      </Stack>
    </form>
  )
}

export default BlogForm
