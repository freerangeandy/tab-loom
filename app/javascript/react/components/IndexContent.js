import React from 'react'

const IndexContent = props => {
  const currentUser = props.currentUser
  const tabList = props.tabList
  const setTabShowIndex = props.setTabShowIndex

  const showNewTab = () => {
    setTabShowIndex(tabList.length)
  }

  let tabDisplayList
  if (tabList.length > 0) {
    tabDisplayList = tabList.map((tab, index) => {
      return (
        <h5
          key={tab.id}
          onClick={() => setTabShowIndex(index)}>
          {tab.title}
        </h5>
      )
    })
  }

  return (
    <div >
      <h4>{currentUser.username}</h4>
      {tabDisplayList}
      <h5 onClick={() => showNewTab()}>+ New Tab</h5>
    </div>
  )
}

export default IndexContent
