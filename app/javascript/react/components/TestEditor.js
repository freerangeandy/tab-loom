import React, { useState } from 'react';
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

const TestEditor = props => {
  const [value, setValue] = useState(sample);

  const anyRowOverflowed = (markup) => {
    let overflow = false
    // const markupSplitCleaned = Array.from(markup).map(el => el.textContent)
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

  const changeHandler = (newValue, delta, source, editor) => {
    if (anyRowOverflowed(newValue)){
      const contents = editor.getContents()
      const invertDel = new Delta(delta).invert(contents)
      const finalDel = contents.compose(invertDel)
      console.log("BLOCKED UPDATE")
      setValue(finalDel)
    } else {
      setValue(newValue)
    }
  }

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={(val, del, s, ed) => changeHandler(val, del, s, ed)}
    />
  );
}

export default TestEditor
