import React, {Fragment} from 'react'

import TabEditor from '../components/TabEditor'
import { COLUMN_COUNT } from '../shared/inStringConsts.js'
import { convertLineBreaksToParagraphs } from '../shared/utility'

const blankLine = '-'.repeat(COLUMN_COUNT-2)
const blankTab = [
  'e|'.concat(blankLine),
  'B|'.concat(blankLine),
  'G|'.concat(blankLine),
  'D|'.concat(blankLine),
  'A|'.concat(blankLine),
  'E|'.concat(blankLine),
].join("\n")

const TabPane = props => {
  const {title, content} = props.tablature

  let editorContent = blankTab
  let isNewTab = true
  if (content.length > 0) {
    isNewTab = false
    editorContent = convertLineBreaksToParagraphs(content)
  }

  let displayTitle = "Untitled Tab"
  if (title.length > 0) {
    displayTitle = title
  }

  const saveContent = (content) => {
    const tabPayloadMissingUser = { title: title, content: content }
    props.saveTab(isNewTab, tabPayloadMissingUser)
  }

  return (
    <>
      <h5>{displayTitle}</h5>
      <TabEditor
        newTab={isNewTab}
        content={editorContent}
        saveContent={saveContent}
        />
    </>
  )
}

export default TabPane
