const setTab = (tab) => {
  return {
    type: "SET_TAB",
    payload: tab
  }
}

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
  setTab,
  setTabTitle,
  setTabContent,
  setSaveable,
  setColumn
}