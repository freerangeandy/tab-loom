const setTabList = (list) => {
  return {
    type: "SET_TAB_LIST",
    payload: list
  }
}

const updateInList = (tab) => {
  return {
    type: "UPDATE_IN_LIST",
    payload: tab
  }
}

const appendToList = (tab) => {
  return {
    type: "APPEND_TO_LIST",
    payload: tab
  }
}

const setSelectedIndex = (index) => {
  return {
    type: "SET_SELECTED_INDEX",
    payload: index
  }
}

export default {
  setTabList,
  updateInList,
  appendToList,
  setSelectedIndex
}
