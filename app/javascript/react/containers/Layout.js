import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import EditorContainer from './EditorContainer'
import IndexSidebar from './IndexSidebar'
import ChordsSidebar from './ChordsSidebar'
import allActions from '../actions'

const Layout = props => {
  const dispatch = useDispatch()
  const tab = useSelector(state => state.tabEditor.tab)
  const setCurrentUser = (user) => {
    dispatch(allActions.userActions.setCurrentUser(user))
  }
  const setTabList = (tabList) => {
    dispatch(allActions.tabsActions.setTabList(tabList))
  }

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
    .then(response => response.json())
    .then(user => {
      if (user != null){
        setCurrentUser({ id: user.id, username: user.username })
        setTabList(user.tablatures)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col>
          <IndexSidebar />
        </Col>
        <Col className="col">
          <EditorContainer />
        </Col>
        <Col>
          <ChordsSidebar />
        </Col>
      </Row>
    </Container>
  )
}

export default Layout
