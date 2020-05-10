const defaultUser = { id: null, username: "visitor" }

const currentUser = (state = defaultUser, action) => {
  switch(action.type) {
    case "SET_CURRENT_USER":
      return action.payload
    case "LOG_OUT":
      return defaultUser
    default:
      return state
  }
}

export default currentUser
