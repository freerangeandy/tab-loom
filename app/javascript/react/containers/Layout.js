import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import EditorContainer from './EditorContainer'
import PartsSideBar from './PartsSideBar'
import ChordsSideBar from './ChordsSideBar'

const Layout = props => {
  return (
    <Container fluid>
      <Row>
        <Col><PartsSideBar /></Col>
        <Col><EditorContainer /></Col>
        <Col><ChordsSideBar /></Col>
      </Row>
    </Container>
  )
}

export default Layout
