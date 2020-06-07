import React, { useEffect, Fragment } from 'react';
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

import blurredBackground from '../../../assets/images/new_tab_blurred.png'

const Layout = props => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
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

  let mainView
  if (currentUser.id !== null) {
    mainView = (
      <>
        <EditorContainer />
        <FretboardContainer />
      </>
    )
  } else {
    mainView = (
      <div className="editor-container">
        <img src={blurredBackground} />
        <a href="/users/sign_in"><h4 className="login-prompt">Sign in to begin editing</h4></a>
      </div>
    )
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <IndexSidebar />
        </Col>
        <Col className="middle-container">
          {mainView}
        </Col>
        <Col>
          <ChordsSidebar />
        </Col>
      </Row>
    </Container>
  )
}

export default Layout
