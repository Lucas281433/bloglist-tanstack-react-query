import { Link } from 'react-router-dom'
import { Badge, Button, Card, CardContent, Stack } from '@mui/material'

import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import './Blogs.css'

/**
 * A single blog component
 *
 * @param {object} blog - a blog object with the following properties:
 * - id: The id of the blog
 * - title: The title of the blog
 * - author: The author of the blog
 * - likes: The number of likes for the blog
 *
 * @returns {object} A JSX element displaying the blog
 */
const Blog = ({ blog }) => {
  return (
    <Card className="blogs-card bloglist">
      <CardContent>
        Title: <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <p>Author: {blog.author}</p>
        <Stack justifyContent="center" alignItems="center" flexGrow={1}>
          <Badge
            color="secondary"
            badgeContent={blog.likes}
            className="icon-position"
          >
            <Button disabled>
              <ThumbUpRoundedIcon className="blogs-icon" />
            </Button>
          </Badge>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Blog
