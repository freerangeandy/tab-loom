import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import StringOverlay from '../components/StringOverlay'
import Dot from '../components/Dot'

const FretboardContainer = (props) => {
  const showDot = (string, fret) => {
    if (string == 3 && fret == 12
      || string == 5 && fret == 12
      || string == 4 && fret == 9
      || string == 4 && fret == 7
      || string == 4 && fret == 5
      || string == 3 && fret == 3
      || string == 5 && fret == 3
    ) {
      return true
    } else return false
  }

  const clickHandler = (stringNum, fretNum) => (event) => {
    console.log(`String: ${stringNum}, Fret: ${fretNum}`)
  }

  const makeRow = (row, numCols, colOffset = 0) => {
    const colGroup = Array.from(Array(numCols).keys()).map(val => {
      const stringNum = row + 1
      const fretNum = val + colOffset + 1

      let dot
      if (showDot(stringNum, fretNum)) {
        dot = <Dot />
      }
      return (
        <Col key={val}
          xs={2}
          className="fretArea"
          onClick={clickHandler(stringNum, fretNum)}>
         {dot}
        </Col>
      )
    })

    return <Row>{colGroup}</Row>
  }

  const grid = Array.from(Array(6).keys()).map((val, row) => {
    const fretArea1 = makeRow(row, 6)
    const fretArea2 = makeRow(row, 6, 6)
    const fretArea3 = makeRow(row, 6, 12)

    return (
      <Row className="fretboardRow" key={val}>
        <Col xs={6}>
          {fretArea1}
        </Col>
        <Col xs={4}>
          {fretArea2}
        </Col>
        <Col xs={2}>
          {fretArea3}
        </Col>
      </Row>
    )
  })
  return (
    <>
      <Container className="fretboardContainer">
        {grid}
      </Container>
      <StringOverlay />
      <ul className="stringLabels">
        <li onClick={clickHandler(1, 0)}>e</li>
        <li onClick={clickHandler(2, 0)}>B</li>
        <li onClick={clickHandler(3, 0)}>G</li>
        <li onClick={clickHandler(4, 0)}>D</li>
        <li onClick={clickHandler(5, 0)}>A</li>
        <li onClick={clickHandler(6, 0)}>E</li>
      </ul>
    </>
  )
}

export default FretboardContainer
