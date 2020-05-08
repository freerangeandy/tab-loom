import React from 'react'
import Sidebar from 'react-sidebar'

import ChordsContent from '../components/ChordsContent'

const ChordsSidebar = props => {
  return (
    <Sidebar
      sidebar={<ChordsContent />}
      docked={true}
      pullRight
      defaultSidebarWidth={0}
      rootClassName={'sidebarRight'}
    >
      <div> </div>
    </Sidebar>
  )
}

export default ChordsSidebar
