import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import '../../../assets/stylesheets/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TestEditor = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = curState => {
    setEditorState(curState)
  }

  return (
    <Editor
      editorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarHidden
      onEditorStateChange={onEditorStateChange}
    />
  )
}

export default TestEditor
