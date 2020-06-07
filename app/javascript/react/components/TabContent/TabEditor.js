import React, { Fragment, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';

import allActions from '../../actions'
import {
  insertDashIntoTabContent,
  clearStrayFormattingFromText,
  preventUpdate,
  shiftSelectionRight,
  shiftSelectionLeft,
  getOffset,
  normalizeSelection,
  indexAtRowEnd,
  indexAtRowStart
} from '../../shared/utility'

const TestEditor = props => {
  const { setSaveFocus, saveClickHandler } = props
  const editorRef = useRef(null)
  const dispatch = useDispatch()
  const tabContent = useSelector(state => state.tabEditor.tab.content)
  const { editorActions } = allActions
  const setTabContent = (content) => { dispatch(editorActions.setTabContent(content)) }
  const setSaveable = (saveable) => { dispatch(editorActions.setSaveable(saveable)) }
  const setColumn = (index) => { dispatch(editorActions.setColumn(index)) }

  const changeHandler = (changedText, delta, source, editor) => {
    const history = editorRef.current != null ? editorRef.current.editor.history : null
    const newValue = clearStrayFormattingFromText(changedText)
    if (preventUpdate(newValue)){
      if (history != null) history.undo()
    } else {
      setTabContent(newValue)
      setSaveable(true)
    }
  }

  const keyDownHandler = (e) => {
    const editorByRef = editorRef.current != null ? editorRef.current.editor : null
    if (editorByRef && editorByRef.hasFocus()) {
      const newIndex = editorByRef.getSelection().index
      let newContent
      switch(e.key){
        case 'ArrowLeft':
          if (!indexAtRowStart(newIndex)) shiftSelectionLeft(editorByRef, newIndex)
          break
        case 'Backspace':
          if (!indexAtRowStart(newIndex)) shiftSelectionLeft(editorByRef, newIndex)
          newContent = insertDashIntoTabContent(tabContent, newIndex)
          setTabContent(newContent)
          break
        case ' ':
          e.preventDefault()
          shiftSelectionRight(editorByRef, newIndex)
          newContent = insertDashIntoTabContent(tabContent, newIndex, 1)
          setTabContent(newContent)
          setSaveable(true)
          break
        case 'Tab':
          e.preventDefault()
          setSaveFocus()
          editorByRef.blur()
          break
        case 'Enter':
          e.preventDefault()
          shiftSelectionLeft(editorByRef, newIndex)
          saveClickHandler()
          break
        default:
          if (indexAtRowEnd(newIndex)) shiftSelectionLeft(editorByRef, newIndex)
          break
      }
    }
  }

  const changeSelectHandler = (range, source, editor) => {
    const editorByRef = editorRef.current != null ? editorRef.current.editor : null
    if (editorByRef && editorByRef.hasFocus()) {
      const newIndex = normalizeSelection(editorByRef)
      const newColumn = getOffset(newIndex)
      setColumn(newColumn)
    }
  }

  const bindings = { tab: false }
  const moduleConfig = {
    keyboard: {
      bindings: bindings
    }
  }

  return (
    <Fragment>
      <ReactQuill
        theme="snow"
        value={tabContent}
        ref={editorRef}
        modules={moduleConfig}
        onChange={(val, del, s, ed) => changeHandler(val, del, s, ed)}
        onChangeSelection={(ra, s, ed) => changeSelectHandler(ra, s, ed)}
        onKeyDown={e => keyDownHandler(e)}
      />
    </Fragment>
  );
}

export default TestEditor
