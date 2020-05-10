import React, { useState, useEffect, useRef } from 'react'
import FormControl from 'react-bootstrap/FormControl'

const TabTitle = (props) => {
  const setTitle = props.setTitle
  const title = props.title

  const [editMode, setEditMode] = useState(false)
  const [currentTitle, setCurrentTitle] = useState(props.title)
  const editTitleRef = useRef(null)

  const clickOutHandler = event => {
    if (editTitleRef.current && !editTitleRef.current.contains(event.target)) {
      setEditMode(false)
    }
  }
  const changeHandler = (event) => {
    setCurrentTitle(event.target.value)
  }

  let titleDisplay
  if (editMode) {
    titleDisplay = (
      <FormControl
        ref={editTitleRef}
        className="editTitle"
        onChange={(e) => changeHandler(e)}
        defaultValue={props.title} />
    )
    document.addEventListener("mousedown", clickOutHandler)
  } else {
    titleDisplay = <h5 onClick={()=> setEditMode(true)}>{props.title}</h5>
  }

  return (
    <div className="editTitle">
      {titleDisplay}
    </div>
  )
}

export default TabTitle
