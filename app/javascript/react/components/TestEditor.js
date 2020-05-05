import React, { Fragment, useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';

const overflowThreshold = 70

const template = `
e|----------------|----------------|----------------|----------------|<br>
B|----------------|----------------|----------------|----------------|<br>
G|----------------|----------------|----------------|----------------|<br>
D|----------------|----------------|----------------|----------------|<br>
A|----------------|----------------|----------------|----------------|<br>
E|----------------|----------------|----------------|----------------|`

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
    if (row.length > overflowThreshold) {
      console.log(`OVERFLOW (line ${rowIdx + 1})`)
      overflow = true;
    }
  })
  return overflow
}

const deltaAttrCount = (delta, attr) => {
  let attrCount = 0
  delta.ops.forEach(action => {
    if (attr in action) {
      attrCount = attr === 'insert' ? action[attr].length : action[attr]
    }
  });
  return attrCount
}

const TestEditor = props => {
  const [textState, setTextState] = useState(template);
  const testRef = useRef(null)

  const changeHandler = (newValue, delta, source, editor) => {
    // const contents = editor.getContents()
    const history = testRef.current != null ? testRef.current.editor.history : null

    if (preventUpdate(newValue)){
      // const invertDel = new Delta(delta).invert(contents)
      // const finalDel = contents.compose(invertDel)
      //
      // console.log("BLOCKED UPDATE")
      // setTextState(finalDel)
      if (history != null) history.undo()
    } else {
      setTextState(newValue)
    }
  }

  const changeSelectionHandler = (range, source, editor) => {
    const editorByRef = testRef.current != null ? testRef.current.editor : null
    if (editorByRef) {
      editorByRef.setSelection(range.index, 1)
    }
  }

  return (
    <Fragment>
    <ReactQuill
      theme="snow"
      value={textState}
      ref={testRef}
      onChange={(val, del, s, ed) => changeHandler(val, del, s, ed)}
      onChangeSelection={(r, s, ed) => changeSelectionHandler(r, s, ed)}
    />
    </Fragment>
  );
}

export default TestEditor
