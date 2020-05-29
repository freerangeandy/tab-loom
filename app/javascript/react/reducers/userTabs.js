const defaultTabsState = {
  list: [],
  selectedIndex: 0,
  deleteClickedIndex: null,
  titleClickedIndex: null
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
        ...state.list.slice(0,state.selectedIndex),
        action.payload,
        ...state.list.slice(state.selectedIndex + 1)
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
    case "DECREMENT_SELECTED_INDEX":
      const newIndex = state.selectedIndex === 0 ? 0 : state.selectedIndex - 1
      return {
        ...state,
        selectedIndex: newIndex
      }
    case "SET_DELETE_CLICKED_INDEX":
      return {
        ...state,
        deleteClickedIndex: action.payload
      }
    case "CLEAR_DELETE_CLICKED_INDEX":
      return {
        ...state,
        deleteClickedIndex: null
      }
    case "SET_TITLE_CLICKED_INDEX":
      return {
        ...state,
        titleClickedIndex: action.payload
      }
    case "CLEAR_TITLE_CLICKED_INDEX":
      return {
        ...state,
        titleClickedIndex: null
      }
    default:
      return state
  }
}

export default userTabs
