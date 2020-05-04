import React, { Fragment, useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta';
import 'react-quill/dist/quill.snow.css';

const overflowThreshold = 70

const sample = `
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

const TestEditor = props => {
  const [textState, setTextState] = useState(sample);
  const testRef = useRef(null)

  const changeHandler = (newValue, delta, source, editor) => {
    const contents = editor.getContents()
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

  return (
    <Fragment>
    <ReactQuill
      theme="snow"
      value={textState}
      ref={testRef}
      onChange={(val, del, s, ed) => changeHandler(val, del, s, ed)}
    />
    </Fragment>
  );
}

export default TestEditor
