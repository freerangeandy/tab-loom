import React from 'react'

const LabelsOverlay = (props) => {
  const clickHandler = props.clickHandler
  
  return (
    <ul className="stringLabels">
      <li onClick={clickHandler(1, 0)}>e</li>
      <li onClick={clickHandler(2, 0)}>B</li>
      <li onClick={clickHandler(3, 0)}>G</li>
      <li onClick={clickHandler(4, 0)}>D</li>
      <li onClick={clickHandler(5, 0)}>A</li>
      <li onClick={clickHandler(6, 0)}>E</li>
    </ul>
  )
}

export default LabelsOverlay
