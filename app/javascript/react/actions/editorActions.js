const setTabTitle = (title) => {
  return {
    type: "SET_TITLE",
    payload: title
  }
}

const setTabContent = (content) => {
  return {
    type: "SET_CONTENT",
    payload: content
  }
}

const setSaveable = (isSaveable) => {
  return {
    type: "SET_SAVEABLE",
    payload: isSaveable
  }
}

const setColumn = (colIndex) => {
  return {
    type: "SET_COLUMN",
    payload: colIndex
  }
}

export default {
  setTabTitle,
  setTabContent,
  setSaveable,
  setColumn
}
