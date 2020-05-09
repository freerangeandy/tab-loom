import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import EditorContainer from './EditorContainer'
import IndexSidebar from './IndexSidebar'
import ChordsSidebar from './ChordsSidebar'
import { BLANK_TAB } from '../shared/inStringConsts'

const Layout = props => {
  const [currentUser, setCurrentUser] = useState({ id: null, username: "visitor" })
  const [tabList, setTabList] = useState([])
  const [tabShowIndex, setTabShowIndex] = useState(0)

  useEffect(() => {
    fetch("/api/v1/users/:id.json")
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json() )
    .then(user => {
      setCurrentUser({ id: user.id, username: user.username })
      setTabList(user.tablatures)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const getTabFromId = (tabId) => tabList.find(tab => tab.id === tabId)
  const setTabShow = (tab) => {
    setTabList([
      ...tabList.slice(0,tabShowIndex),
      tab,
      ...tabList.slice(tabShowIndex + 1)
    ])
  }

  let tabShow = { id: null, title: "Untitled Tab", content: BLANK_TAB }
  if (tabList.length > 0)  {
    tabShow = tabList[tabShowIndex]
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <IndexSidebar
            currentUser={currentUser}
            tabList={tabList}
            setTabShowIndex={setTabShowIndex}
          />
        </Col>
        <Col className="col">
          <EditorContainer
            currentUser={currentUser}
            tabShow={tabShow}
            setTabShow={setTabShow}
          />
        </Col>
        <Col>
          <ChordsSidebar />
        </Col>
      </Row>
    </Container>
  )
}

export default Layout
