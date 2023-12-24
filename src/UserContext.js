import React from 'react'

// Initializes a react context
const UserContext = React.createContext()

// Initializes a context provider
// Gives us ability to provide a specific context through component

export const UserProvider = UserContext.Provider

export default UserContext
