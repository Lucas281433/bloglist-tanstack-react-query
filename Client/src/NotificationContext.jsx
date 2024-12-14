import { useReducer, useContext, createContext } from 'react'

/**
 * Notification reducer that handles two types of actions:
 * - SHOW_NOTIFICATION: Sets the notification to the payload of the action.
 * - HIDE_NOTIFICATION: Sets the notification to null.
 * If the action type is not recognized, it returns the existing state.
 */
const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return action.payload
  case 'HIDE_NOTIFICATION':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

/**
 * Provider component for the NotificationContext.
 * It wraps the given children components and makes the notification
 * dispatch function and the current notification available to them.
 *
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Components to be wrapped.
 * @returns {JSX.Element} A JSX element containing the NotificationContext provider.
 */
export const NotificationContextProvider = (props) => {
  const [notificaton, notificatonDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notificaton, notificatonDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

/**
 * Hook to access the current notification value from the NotificationContext.
 * @returns {String|null} The current notification value, null if no notification is shown.
 */
export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

/**
 * Hook to access the notification dispatch function from the NotificationContext.
 * @returns {function} A function that takes an object with a type property,
 * which can be either 'SHOW_NOTIFICATION' or 'HIDE_NOTIFICATION', and an optional
 * payload property, which is passed to the notificationReducer.
 */
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}
