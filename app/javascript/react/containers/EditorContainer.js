import React from 'react'

import TabPane from '../components/TabPane'

const EditorContainer = props => {
  return (
    <div className="editorContainer" >
      <TabEditor />
      <TabPane />
    </div>
  )
}

export default EditorContainer
