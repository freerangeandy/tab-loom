import React, { Fragment, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';

import allActions from '../actions'
import {
  insertDashIntoTabContent,
  clearStrayFormattingFromText,
  preventUpdate,
  shiftSelectionRight,
  shiftSelectionLeft,
  getOffset,
  indexAtRowEnd,
  indexAtRowStart
} from '../shared/utility'

const TestEditor = props => {
  const { setSaveFocus, saveClickHandler } = props
  const editorRef = useRef(null)
  const dispatch = useDispatch()
  const tabContent = useSelector(state => state.tabEditor.tab.content)
  const setTabContent = (content) => {
    dispatch(allActions.editorActions.setTabContent(content))
  }
  const setSaveable = (saveable) => {
    dispatch(allActions.editorActions.setSaveable(saveable))
  }
  const setColumn = (index) => {
    dispatch(allActions.editorActions.setColumn(index))
  }

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
      let newIndex = editorByRef.getSelection().index

      if (e.key === 'ArrowLeft' && !indexAtRowStart(newIndex)) {
          shiftSelectionLeft(editorByRef, newIndex)
      } else if(e.key === 'Backspace') {
        if (!indexAtRowStart(newIndex)){
          shiftSelectionLeft(editorByRef, newIndex)
        }
        let newContent = insertDashIntoTabContent(tabContent, newIndex)
        setTabContent(newContent)
      } else if (e.key === ' ') {
        e.preventDefault()
        shiftSelectionRight(editorByRef, newIndex)
        let newContent = insertDashIntoTabContent(tabContent, newIndex, 1)
        setTabContent(newContent)
        setSaveable(true)
      } else if (e.key === 'Tab') {
        e.preventDefault()
        setSaveFocus()
        editorByRef.blur()
      } else if (e.key === 'Enter') {
        e.preventDefault()
        shiftSelectionLeft(editorByRef, newIndex)
        saveClickHandler()
      } else {
        if (indexAtRowEnd(newIndex)) {
          shiftSelectionLeft(editorByRef, newIndex)
        }
      }
    }
  }

  const changeSelectHandler = (range, source, editor) => {
    const editorByRef = editorRef.current != null ? editorRef.current.editor : null
    if (editorByRef && editorByRef.hasFocus()) {
      let newIndex = editorByRef.getSelection().index

      while (indexAtRowStart(newIndex)) newIndex++
      while (indexAtRowEnd(newIndex)) newIndex--
      if (newIndex !== editor.getSelection().index || editor.getSelection().length !== 1) {
        editorByRef.setSelection(newIndex, 1)
      }
      const newOffset = getOffset(newIndex)
      setColumn(newOffset)
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
