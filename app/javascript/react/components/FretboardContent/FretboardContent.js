import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import StringOverlay from './StringOverlay'
import LabelsOverlay from './LabelsOverlay'
import Dot from './Dot'
import allActions from '../../actions'
import { getContentAfterFretNoteInsert } from '../../shared/utility'

const FretboardContent = (props) => {
  const dispatch = useDispatch()
  const column = useSelector(state => state.tabEditor.column)
  const tabContent = useSelector(state => state.tabEditor.tab.content)
  const setTabContent = (content) => {
    dispatch(allActions.editorActions.setTabContent(content))
  }
  const setSaveable = (saveable) => {
    dispatch(allActions.editorActions.setSaveable(saveable))
  }
  const incrementColumn = () => {
    dispatch(allActions.editorActions.incrementColumn())
  }

  const showDot = (string, fret) => {
    if (fret == 12 && [3, 5].includes(string)
      || string == 4 && [3, 5, 7, 9, 15].includes(fret)
    ) {
      return true
    } else return false
  }

  const clickHandler = (stringNum, fretNum) => (event) => {
    const contentAfterInsert = getContentAfterFretNoteInsert(tabContent, column, stringNum, fretNum)
    setTabContent(contentAfterInsert)
    incrementColumn()
    setSaveable(true)
  }

  const makeRow = (row, numCols, colOffset = 0) => {
    const colGroup = Array.from(Array(numCols).keys()).map(val => {
      const stringNum = row + 1
      const fretNum = val + colOffset + 1

      let dot
      if (showDot(stringNum, fretNum)) {
        dot = <Dot />
      }
      const colSlotsPer = 12 / numCols

      return (
        <Col key={val}
          xs={colSlotsPer}
          className="fret-area"
          onClick={clickHandler(stringNum, fretNum)}>
         {dot}
        </Col>
      )
    })

    return <Row>{colGroup}</Row>
  }

  const grid = Array.from(Array(6).keys()).map((val, row) => {
    const fretArea1 = makeRow(row, 6)
    const fretArea2 = makeRow(row, 4, 6)
    const fretArea3 = makeRow(row, 3, 10)
    const fretArea4 = makeRow(row, 2, 13)
    const fretArea5 = makeRow(row, 3, 15)

    return (
      <Row className="fretboard-row" key={val}>
        <Col xs={5}>
          {fretArea1}
        </Col>
        <Col xs={3}>
          {fretArea2}
        </Col>
        <Col xs={2}>
          {fretArea3}
        </Col>
        <Col xs={1}>
          {fretArea4}
        </Col>
        <Col xs={1}>
          {fretArea5}
        </Col>
      </Row>
    )
  })
  return (
    <>
      <Container className="fretboard-content">
        {grid}
      </Container>
      <StringOverlay />
      <LabelsOverlay clickHandler={clickHandler} />
    </>
  )
}

export default FretboardContent
