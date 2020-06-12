import React from 'react'

import { STRING_LABEL } from '../../shared/inStringConsts'

const LabelsOverlay = (props) => {
  const clickHandler = props.clickHandler

  const string_labels = STRING_LABEL.map((label, stringNum) => {
    return (
      <li key={stringNum} onClick={clickHandler(stringNum + 1, 0)}>
        {STRING_LABEL[stringNum]}
      </li>
    )
  })

  return (
    <ul className="string-labels">
      {string_labels}
    </ul>
  )
}

export default LabelsOverlay
