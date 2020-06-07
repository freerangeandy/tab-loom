import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import EditorContainer from './EditorContainer'
import FretboardContainer from './FretboardContainer'
import IndexSidebar from './IndexSidebar'
import ChordsSidebar from './ChordsSidebar'
import { fetchUser } from './FetchRequests'
import allActions from '../actions'

const Layout = props => {
  const dispatch = useDispatch()
  const tab = useSelector(state => state.tabEditor.tab)
  const { tabsActions, userActions } = allActions
  const setCurrentUser = (user) => { dispatch(userActions.setCurrentUser(user)) }
  const setTabList = (tabList) => { dispatch(tabsActions.setTabList(tabList)) }

  const successCallback = user => {
    if (user != null) {
      setCurrentUser({ id: user.id, username: user.username })
      setTabList(user.tablatures)
    }
  }

  useEffect(() => {
    fetchUser(successCallback)
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col>
          <IndexSidebar />
        </Col>
        <Col className="middle-container">
          <EditorContainer />
          <FretboardContainer />
        </Col>
        <Col>
          <ChordsSidebar />
        </Col>
      </Row>
    </Container>
  )
}

export default Layout
