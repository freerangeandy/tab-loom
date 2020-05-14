const defaultChords = []

const chords = (state = defaultChords, action) => {
  switch(action.type) {
    case "SET_CHORDS":
      return action.payload
    default:
      return state
  }
}

export default chords
