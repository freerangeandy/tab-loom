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

export default {
  setTabList,
  updateInList,
  setSelectedIndex,
  decrementSelectedIndex
}
