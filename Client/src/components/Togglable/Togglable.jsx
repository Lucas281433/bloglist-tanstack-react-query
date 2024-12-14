import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Stack, Button } from '@mui/material'

import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded'
import createImage from '../../assets/create.webp'
import './Toggleble.css'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    /*The button-style class is in index.css*/
    <Stack direction="column" justifyContent="flex-end" alignItems="center">
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          className='button-style'
          onClick={toggleVisibility}
        >
          <PostAddRoundedIcon />
          {props.buttonLabel}
        </Button>
      </div>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        style={showWhenVisible}
      >
        <div>
          {props.children}
          <Stack>
            <Button
              variant="contained"
              color="error"
              className='button-cancel'
              onClick={toggleVisibility}
            >
              Cancel
            </Button>
          </Stack>
        </div>
        <img src={createImage} className='form-image' />
      </Stack>
    </Stack>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
