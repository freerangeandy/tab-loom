import React from 'react'
import Sidebar from 'react-sidebar'

import IndexContent from '../components/IndexContent'

const IndexSidebar = props => {
  const indexContent = (
    <IndexContent {...props}  />
  )

  return (
    <Sidebar
      sidebar={indexContent}
      docked={true}
      defaultSidebarWidth={0}
      rootClassName={'indexSidebar'}
    >
      <div> </div>
    </Sidebar>
  )
}

export default IndexSidebar
