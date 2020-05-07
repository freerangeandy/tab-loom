import React, {useState} from 'react'
import Sidebar from 'react-sidebar'

import SidebarContent from '../components/SidebarContent'

const IndexSideBar = props => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Sidebar
    sidebar={<SidebarContent />}
    docked={true}
    rootClassName={'sidebar'}
    >
      <div> </div>
    </Sidebar>
  )
}

export default IndexSideBar
