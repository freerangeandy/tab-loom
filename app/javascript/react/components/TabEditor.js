import React, { Fragment, useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';

import * as util from '../shared/utility'

const COLUMN_COUNT = 70

const blankLine = '-'.repeat(COLUMN_COUNT-2)
const blankTab = [
  'e|'.concat(blankLine),
  'B|'.concat(blankLine),
  'G|'.concat(blankLine),
  'D|'.concat(blankLine),
  'A|'.concat(blankLine),
  'E|'.concat(blankLine),
]

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

const getRow = (index) => parseInt(index / (COLUMN_COUNT + 1))
const getOffset = (index) => index % (COLUMN_COUNT + 1)
const indexAtRowEnd = (index) => getOffset(index) === COLUMN_COUNT
const indexAtRowStart = (index) => getOffset(index) >= 0 && getOffset(index) <= 1

const shiftSelectionLeft = (editor, curIndex) => {
  curIndex--
  editor.setSelection(curIndex, 1)
}

const insertDashIntoTabArray = (tabArray, curIndex, length = 0) => {
  const [row, offset] = [getRow(curIndex), getOffset(curIndex)]
  tabArray[row] = tabArray[row].slice(0, offset) + '-' + tabArray[row].slice(offset+length)
  return tabArray
}

const clearStrayFormattingFromText = (text) => {
  let newText = text.replace(/&[^&;]+;| |\./g, '-')
  return newText
}

const TestEditor = props => {
  const [tabState, setTabState] = useState(blankTab)
  const editorRef = useRef(null)

  const changeHandler = (changedText, delta, source, editor) => {
    const history = editorRef.current != null ? editorRef.current.editor.history : null
    const newValue = clearStrayFormattingFromText(changedText)
    if (preventUpdate(newValue)){
      if (history != null) history.undo()
    } else {
      const newStateArray = util.markupStringToStringArray(newValue)
      setTabState(newStateArray)
    }
  }

  const keyDownHandler = (e) => {
    const editorByRef = editorRef.current != null ? editorRef.current.editor : null
    if (editorByRef) {
      let newIndex = editorByRef.getSelection().index || 0

      if (e.key === 'ArrowLeft' && !indexAtRowStart(newIndex)) {
          shiftSelectionLeft(editorByRef, newIndex)
      } else if(e.key === 'Backspace') {
        if (!indexAtRowStart(newIndex)){
          shiftSelectionLeft(editorByRef, newIndex)
        }
        let newStateArray = insertDashIntoTabArray(new Array(...tabState), newIndex)
        setTabState(newStateArray)
      } else if (e.key === ' ') {
        let newStateArray = insertDashIntoTabArray(new Array(...tabState), newIndex, 1)
        setTabState(newStateArray)
      } else {
        if (indexAtRowEnd(newIndex)) {
          shiftSelectionLeft(editorByRef, newIndex)
        }
      }
    }
  }

  const changeSelectHandler = (range, source, editor) => {
    const editorByRef = editorRef.current != null ? editorRef.current.editor : null
    if (editorByRef) {
      let newIndex = editor.getSelection().index || 0
      while (indexAtRowStart(newIndex)) newIndex++
      while (indexAtRowEnd(newIndex)) newIndex--
      editorByRef.setSelection(newIndex, 1)
    }
  }

  return (
    <Fragment>
    <ReactQuill
      theme="snow"
      value={util.stringArrayToMarkupString(tabState)}
      ref={editorRef}
      onChange={(val, del, s, ed) => changeHandler(val, del, s, ed)}
      onChangeSelection={(ra, s, ed) => changeSelectHandler(ra, s, ed)}
      onKeyDown={e => keyDownHandler(e)}
    />
    </Fragment>
  );
}

export default TestEditor
