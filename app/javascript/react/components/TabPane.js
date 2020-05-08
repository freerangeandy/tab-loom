import React, {Fragment} from 'react'

import TabEditor from '../components/TabEditor'

const TabPane = props => {
  const {title, content} = props.tablature

  const saveContent = (content) => {
    const tabPayloadMissingUser = { title: title, content: content }
    props.saveTab(tabPayloadMissingUser)
  }

  return (
    <>
      <h5>{title}</h5>
      <TabEditor
        content={content}
        saveContent={saveContent}
        />
    </>
  )
}

export default TabPane
