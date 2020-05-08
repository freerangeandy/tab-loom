import React from 'react'
import Sidebar from 'react-sidebar'

import IndexContent from '../components/IndexContent'

const IndexSidebar = props => {
  const currentUser = props.currentUser
  const tabList = props.tabList

  const indexContent = (
    <IndexContent
      currentUser={currentUser}
      tabList={tabList}
    />
  )

  return (
    <Sidebar
      sidebar={indexContent}
      docked={true}
      defaultSidebarWidth={0}
      rootClassName={'sidebarLeft'}
    >
      <div> </div>
    </Sidebar>
  )
}

export default IndexSidebar
