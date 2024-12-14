import { Alert } from '@mui/material'
import { useNotificationValue } from '../../NotificationContext'

/**
 * A component that displays a notification message.
 * The message is obtained from the NotificationContext.
 * If the message is null, the component does not render anything.
 * If the message starts with 'A new', it is displayed as a success message.
 * Otherwise it is displayed as an error message.
 */
const Notification = () => {
  const message = useNotificationValue()

  if (message === null) {
    return null
  }

  if (message.startsWith('A new')) {
    return <Alert variant='filled' severity='success'>{message}</Alert>
  }

  return <Alert variant='filled' severity='error' >{message}</Alert>
}

export default Notification
