import React from 'react'

import { STRING_LABEL } from '../../shared/inStringConsts'

const LabelsOverlay = (props) => {
  const { hoverFrets, clickHandler} = props

  const getLabelClass = (stringNum) => {
    const flippedHoverFrets = [...hoverFrets].reverse()
    const hoverFretOnString = flippedHoverFrets[stringNum-1]
    if (hoverFretOnString === "0") {
      return { className: "string-label-hl" }
    } else {
      return null
    }
  }

  const string_labels = STRING_LABEL.map((label, row) => {
    const stringNum = row + 1
    const labelClass = getLabelClass(stringNum)
    return (
      <li
        key={row}
        {...labelClass}
        onClick={clickHandler(stringNum, 0)}
      >
        {STRING_LABEL[row]}
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
