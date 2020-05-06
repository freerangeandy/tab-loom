import React, { Fragment, useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';

import * as util from '../shared/utility'

const COLUMN_COUNT = 70

const blankLine = '-'.repeat(COLUMN_COUNT)
const blankTab = [
  blankLine,
  blankLine,
  blankLine,
  blankLine,
  blankLine,
  blankLine,
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

const offset = (index) => index % (COLUMN_COUNT + 1)

const TestEditor = props => {
  const [tabState, setTabState] = useState(blankTab)
  const editorRef = useRef(null)

  const changeHandler = (newValue, delta, source, editor) => {
    const history = editorRef.current != null ? editorRef.current.editor.history : null

    if (preventUpdate(newValue)){
      if (history != null) history.undo()
    } else {
      const newStateArray = util.markupStringToStringArray(newValue)
      setTabState(newStateArray)
    }
  }

  const keyPressHandler = (e) => {
    const editorByRef = editorRef.current != null ? editorRef.current.editor : null
    if (editorByRef) {
      let newIndex = editorByRef.getSelection().index
      if (offset(newIndex) === COLUMN_COUNT) {
        newIndex--
      }

      if (e.key === 'ArrowLeft' && offset(newIndex) !== 0) {
        newIndex--
        editorByRef.setSelection(newIndex, 1)
      } else if(e.key === 'Backspace') {
        editorByRef.setSelection(newIndex, 1)
        editorByRef.insertText(0,'-')
      } else {
        editorByRef.setSelection(newIndex, 1)
      }
    }
  }

  return (
    <Fragment>
    <ReactQuill
      theme="snow"
      value={util.stringArrayToMarkupString(tabState)}
      ref={editorRef}
      onChange={(val, del, s, ed) => changeHandler(val, del, s, ed)}
      onKeyDown={e => keyPressHandler(e)}
    />
    </Fragment>
  );
}

export default TestEditor
