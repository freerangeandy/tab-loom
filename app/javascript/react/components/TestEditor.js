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

const deltaAttrCount = (delta, attr) => {
  let attrCount = 0
  delta.ops.forEach(action => {
    if (attr in action) {
      attrCount = attr === 'insert' ? action[attr].length : action[attr]
    }
  });
  return attrCount
}

const fillDeleteDelta = delta => {
  let deleteCount = 0

  delta.ops.forEach(action => {
    if ('retain' in action) {
      retainCount = action.retain
    }
    if ('delete' in action) {
      deleteCount = action.delete
    }
  });

  const addedDashes = '-'.repeat(deleteCount)
  return new Delta().retain(retainCount).insert(addedDashes)
}

const TestEditor = props => {
  const [textState, setTextState] = useState(sample);
  const testRef = useRef(null)

  const changeHandler = (newValue, delta, source, editor) => {
    const contents = editor.getContents()
    let cleanDelta = new Delta(delta)
    const history = testRef.current != null ? testRef.current.editor.history : null

    const deleteCount = deltaAttrCount(cleanDelta, 'delete')
    const retainCount = deltaAttrCount(cleanDelta, 'retain')
    const insertCount = deltaAttrCount(cleanDelta, 'insert')
        debugger

    if (preventUpdate(newValue)){
      if (history != null) history.undo()
    } else if(deleteCount - insertCount > 0) {
        const addedDashes = '-'.repeat(deleteCount)
        const newDelta = new Delta().retain(retainCount).insert(addedDashes)
        const finalDel = contents.compose(newDelta)
        debugger
        setTextState(finalDel)
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
