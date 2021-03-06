const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: user
  }
}

const logOut = () => {
  return {
    type: "LOG_OUT"
  }
}

export default {
  setCurrentUser,
  logOut
}
