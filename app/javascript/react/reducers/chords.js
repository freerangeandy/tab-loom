const defaultChordState = {
  list: [],
  hoverFrets: []
}

const chords = (state = defaultChordState, action) => {
  switch(action.type) {
    case "SET_CHORDS":
      return {
        ...state,
        list: action.payload
      }
    case "SET_HOVER_FRETS":
      return {
        ...state,
        hoverFrets: action.payload
      }
    default:
      return state
  }
}

export default chords
