import React, { useState, useEffect, useRef } from 'react'
import FormControl from 'react-bootstrap/FormControl'

const TabTitle = (props) => {
  const setSaveable = props.setSaveable
  const setTabTitle = props.setTabTitle
  const tabTitle = props.tabTitle

  const [editMode, setEditMode] = useState(false)
  const editTitleRef = useRef(null)

  const clickOutHandler = event => {
    if (editTitleRef.current && !editTitleRef.current.contains(event.target)) {
      setEditMode(false)
    }
  }
  const changeHandler = (event) => {
    setTabTitle(event.target.value)
    setSaveable(true)
  }

  let titleDisplay
  if (editMode) {
    titleDisplay = (
      <FormControl
        ref={editTitleRef}
        className="editTitle"
        onChange={(e) => changeHandler(e)}
        defaultValue={tabTitle} />
    )
    document.addEventListener("mousedown", clickOutHandler)
  } else {
    titleDisplay = <h5 onClick={()=> setEditMode(true)}>{tabTitle}</h5>
  }

  return (
    <div className="editTitle">
      {titleDisplay}
    </div>
  )
}

export default TabTitle
