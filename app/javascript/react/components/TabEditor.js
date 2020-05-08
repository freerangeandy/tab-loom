import React, { Fragment, useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';
import Button from 'react-bootstrap/Button'

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
// const getRow = (index) => parseInt(index / (COLUMN_COUNT + 1))
const getOffset = (index) => index % (COLUMN_COUNT + 1)
const indexAtRowEnd = (index) => getOffset(index) === COLUMN_COUNT
const indexAtRowStart = (index) => getOffset(index) >= 0 && getOffset(index) <= 1

const TestEditor = props => {
  const [tabState, setTabState] = useState(props.content)
  const [saveable, setSaveable] = useState(false)

  const editorRef = useRef(null)

  const changeHandler = (changedText, delta, source, editor) => {
    const history = editorRef.current != null ? editorRef.current.editor.history : null
    const newValue = clearStrayFormattingFromText(changedText)
    if (preventUpdate(newValue)){
      if (history != null) history.undo()
    } else {
      setTabState(newValue)
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
        let newState = insertDashIntoTabContent(tabState, newIndex)
        setTabState(newState)
      } else if (e.key === ' ') {
        let newState = insertDashIntoTabContent(tabState, newIndex, 1)
        setTabState(newState)
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
        console.log("another selection !")
      }
    }
  }

  const saveClickHandler = (event) => {
    props.saveContent(tabState)
    setSaveable(false)
  }

  let disabledSave = saveable ? {} : {disabled: 'disabled'}
  return (
    <Fragment>
      <ReactQuill
        theme="snow"
        value={tabState}
        ref={editorRef}
        onChange={(val, del, s, ed) => changeHandler(val, del, s, ed)}
        onChangeSelection={(ra, s, ed) => changeSelectHandler(ra, s, ed)}
        onKeyDown={e => keyDownHandler(e)}
      />
      <Button
        className="saveButton"
        variant="primary"
        size="md"
        {...disabledSave}
        onClick={(e) => saveClickHandler(e)}>
          Save
      </Button>
    </Fragment>
  );
}

export default TestEditor
