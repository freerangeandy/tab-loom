const setChords = (chordList) => {
  return {
    type: "SET_CHORDS",
    payload: chordList
  }
}

const setHoverFrets = (frets) => {
    return {
      type: "SET_HOVER_FRETS",
      payload: frets
    }
}

const resetHoverFrets = () => {
    return {
      type: "RESET_HOVER_FRETS"
    }
}

export default {
  setChords,
  setHoverFrets,
  resetHoverFrets
}
