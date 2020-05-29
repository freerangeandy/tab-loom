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

const setSelectedIndex = (index) => {
  return {
    type: "SET_SELECTED_INDEX",
    payload: index
  }
}

const decrementSelectedIndex = () => {
  return {
    type: "DECREMENT_SELECTED_INDEX"
  }
}

const setDeleteClickedIndex = (index) => {
  return {
    type: "SET_DELETE_CLICKED_INDEX",
    payload: index
  }
}

const clearDeleteClickedIndex = () => {
  return {
    type: "CLEAR_DELETE_CLICKED_INDEX"
  }
}

const setTitleClickedIndex = (index) => {
  return {
    type: "SET_TITLE_CLICKED_INDEX",
    payload: index
  }
}

const clearTitleClickedIndex = () => {
  return {
    type: "CLEAR_TITLE_CLICKED_INDEX"
  }
}

export default {
  setTabList,
  updateInList,
  setSelectedIndex,
  decrementSelectedIndex,
  setDeleteClickedIndex,
  clearDeleteClickedIndex,
  setTitleClickedIndex,
  clearTitleClickedIndex,
}
