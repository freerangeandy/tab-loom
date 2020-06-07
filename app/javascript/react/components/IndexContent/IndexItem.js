import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import allActions from '../../actions'

const IndexItem = (props) => {
  const { indexItemClass, indexItemTitle, clickHandler, deleteHandler } = props

  return (
    <li className="d-flex flex-row">
      <button type="button" onClick={deleteHandler} className="close" aria-label="Close">
        <span aria-hidden="true">
          <FontAwesomeIcon icon={ faTimesCircle } />
        </span>
      </button>
      <h5 className={indexItemClass} onClick={clickHandler}>
        {indexItemTitle}
      </h5>
    </li>
  )
}

export default IndexItem
