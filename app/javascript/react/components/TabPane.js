import React, {Fragment} from 'react'

import TabEditor from '../components/TabEditor'
import {COLUMN_COUNT} from '../shared/inStringConsts.js'
import * as util from '../shared/utility'

const blankLine = '-'.repeat(COLUMN_COUNT-2)
const blankTab = [
  'e|'.concat(blankLine),
  'B|'.concat(blankLine),
  'G|'.concat(blankLine),
  'D|'.concat(blankLine),
  'A|'.concat(blankLine),
  'E|'.concat(blankLine),
]

const TabPane = props => {
  const {title, content} = props.tablature

  let editorContent = blankTab
  let isNewTab = true
  if (content.length > 0) {
    // ugly
    isNewTab = false
    editorContent = util.markupStringToStringArray(content.replace(/\n/ig, '<p>'))
  }

  const fetchSaveFromContent = (content) => {
    const tabPayload = { title: title, content: content }
    props.fetchSaveTab(isNewTab, tabPayload)
  }

  return (
    <>
      <h5>{title}</h5>
      <TabEditor
        newTab={isNewTab}
        content={editorContent}
        fetchSaveFromContent={fetchSaveFromContent}
        />
    </>
  )
}

export default TabPane
