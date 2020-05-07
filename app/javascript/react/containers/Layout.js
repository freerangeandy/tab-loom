import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import EditorContainer from './EditorContainer'
import IndexSidebar from './IndexSidebar'
import ChordsSidebar from './ChordsSidebar'

const Layout = props => {
  return (
    <Container fluid>
      <Row>
        <Col><IndexSidebar /></Col>
        <Col className="col"><EditorContainer /></Col>
        <Col><ChordsSidebar /></Col>
      </Row>
    </Container>
  )
}

export default Layout
