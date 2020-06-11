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

export default {
  setChords,
  setHoverFrets
}
