import React, { Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import StringOverlay from '../components/StringOverlay'

const FretboardContainer = (props) => {
  const columns = (numCols) => {
    const colGroup = Array.from(Array(numCols).keys()).map(val => {
      return (
        <Col key={val} xs={2} className="fretArea">

        </Col>
      )
    })

    return <Row>{colGroup}</Row>
  }

  const columns1 = columns(6)
  const columns2 = columns(6)
  const columns3 = columns(6)

  const grid = Array.from(Array(6).keys()).map(val => {
    return (
      <Row className="fretboardRow" key={val}>
        <Col xs={6}>
          {columns1}
        </Col>
        <Col xs={4}>
          {columns2}
        </Col>
        <Col xs={2}>
          {columns3}
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
    </>
  )
}

export default FretboardContainer
