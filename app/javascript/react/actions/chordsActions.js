const setChords = (chordList) => {
  return {
    type: "SET_CHORDS",
    payload: chordList
  }
}

export default {
  setChords
}
