import { BLANK_TAB } from '../shared/inStringConsts'

const defaultEditorState = {
  editorTab: {
    id: null,
    title: "Untitled Tab",
    content: BLANK_TAB
  },
  saveable: false,
  column: 0,
}

const tabEditor = (state = defaultEditorState, action) => {
  switch(action.type) {
    case "SET_TITLE":
      return {
        ...state,
        editorTab: {
          ...state.editorTab,
          title: action.payload
        }
      }
    case "SET_CONTENT":
      return {
        ...state,
        editorTab: {
          ...state.editorTab,
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
    default:
      return state
  }
}

export default tabEditor
