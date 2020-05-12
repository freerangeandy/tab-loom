import { BLANK_TAB } from '../shared/inStringConsts'

const defaultEditorState = {
  tab: {
    id: null,
    title: "Untitled Tab",
    content: BLANK_TAB
  },
  saveable: false,
  column: 2,
}

const tabEditor = (state = defaultEditorState, action) => {
  switch(action.type) {
    case "SET_TAB":
      const tabShow = action.payload ? action.payload : defaultEditorState.tab
      return {
        ...state,
        tab: tabShow
      }
    case "SET_TITLE":
      return {
        ...state,
        tab: {
          ...state.tab,
          title: action.payload
        }
      }
    case "SET_CONTENT":
      return {
        ...state,
        tab: {
          ...state.tab,
          content: action.payload
        }
      }
    case "SET_SAVEABLE":
      return {
        ...state,
        saveable: action.payload
      }
    case "SET_COLUMN":
      return {
        ...state,
        column: action.payload
      }
    case "RESET_COLUMN":
      return {
        ...state,
        column: defaultEditorState.column
      }
    default:
      return state
  }
}

export default tabEditor
