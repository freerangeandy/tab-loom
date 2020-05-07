import React from 'react'
import Sidebar from 'react-sidebar'

import IndexContent from '../components/IndexContent'

const IndexSidebar = props => {
  return (
    <Sidebar
      sidebar={<IndexContent />}
      docked={true}
      defaultSidebarWidth={'0'}
      rootClassName={'sidebarLeft'}
    >
      <div> </div>
    </Sidebar>
  )
}

export default IndexSidebar
