import React, { Fragment, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';

import allActions from '../actions'

import {
  insertDashIntoTabContent,
  clearStrayFormattingFromText
} from '../shared/utility'
import { COLUMN_COUNT } from '../shared/inStringConsts.js'

const preventUpdate = (markup) => {
  return (!correctRowCount(markup) || anyRowOverflow(markup))
}

const correctRowCount = (markup) => {
  const rows = [...markup.matchAll(/<p>/g)]
  const rowCount = rows.length
  return rowCount === 6
}

const anyRowOverflow = (markup) => {
  let overflow = false
  const markupSplitCleaned = markup
    .split(/<\/?p>/)
    .map(el => el.trim())
    .filter(el => el.length > 0)

  markupSplitCleaned.forEach((row, rowIdx) => {
    if (row.length > COLUMN_COUNT) {
      console.log(`OVERFLOW (line ${rowIdx + 1})`)
      overflow = true;
    }
  })
  return overflow
}

const shiftSelectionLeft = (editor, curIndex) => {
  curIndex--
  editor.setSelection(curIndex, 1)
}

const shiftSelectionRight = (editor, curIndex) => {
  curIndex++
  editor.setSelection(curIndex, 1)
}
// const getRow = (index) => parseInt(index / (COLUMN_COUNT + 1))
const getOffset = (index) => index % (COLUMN_COUNT + 1)
const indexAtRowEnd = (index) => getOffset(index) === COLUMN_COUNT
const indexAtRowStart = (index) => getOffset(index) >= 0 && getOffset(index) <= 1

const TestEditor = props => {
  const editorRef = useRef(null)
  const dispatch = useDispatch()
  const tabContent = useSelector(state => state.tabEditor.tab.content)
  const setTabContent = (content) => {
    dispatch(allActions.editorActions.setTabContent(content))
  }
  const setSaveable = (saveable) => {
    dispatch(allActions.editorActions.setSaveable(saveable))
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
    }
  }

  return (
    <Fragment>
      <ReactQuill
        theme="snow"
        value={tabContent}
        ref={editorRef}
        onChange={(val, del, s, ed) => changeHandler(val, del, s, ed)}
        onChangeSelection={(ra, s, ed) => changeSelectHandler(ra, s, ed)}
        onKeyDown={e => keyDownHandler(e)}
      />
    </Fragment>
  );
}

export default TestEditor
