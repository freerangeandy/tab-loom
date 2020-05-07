import React, {useState} from 'react'
import Sidebar from 'react-sidebar'

import IndexContent from '../components/IndexContent'

const IndexSidebar = props => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Sidebar
    sidebar={<IndexContent />}
    docked={true}
    rootClassName={'sidebar'}
    >
      <div> </div>
    </Sidebar>
  )
}

export default IndexSidebar
