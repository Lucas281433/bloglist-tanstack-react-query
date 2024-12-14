import { useReducer, createContext, useContext } from 'react'

/**
 * Reducer for the user context.
 *
 * Actions:
 * - SET_USER: Sets the user to the payload of the action.
 *
 * If the action type is not recognized, it returns the existing state.
 */
const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.payload
  default:
    return state
  }
}

const UserContext = createContext()

/**
 * Provider component for the UserContext.
 * It wraps the given children components and makes the user state
 * and user dispatch function available to them.
 *
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Components to be wrapped.
 * @returns {JSX.Element} A JSX element containing the UserContext provider.
 */
export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext

/**
 * Hook to access the current user state from the UserContext.
 * @returns {Object|null} The current user state, null if no user is logged in.
 */
export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

/**
 * Hook to access the user dispatch function from the UserContext.
 * @returns {function} The user dispatch function.
 */
export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}
