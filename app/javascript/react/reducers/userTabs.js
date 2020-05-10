const defaultTabsState = {
  list: [],
  selectedIndex: 0
}

const userTabs = (state = defaultTabsState, action) => {
  switch(action.type) {
    case "SET_TAB_LIST":
      return {
        ...state,
        list: action.payload
      }
    case "UPDATE_IN_LIST":
      const updatedList = [
        ...state.list.slice(0,selectedIndex),
        action.payload,
        ...state.list.slice(selectedIndex + 1)
      ]
      return {
        ...state,
        list: updatedList
      }
    case "APPEND_TO_LIST":
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    case "SET_SELECTED_INDEX":
      return {
        ...state,
        selectedIndex: action.payload
      }
    default:
      return state
  }
}

export default userTabs
