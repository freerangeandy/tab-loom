import React from 'react'

const IndexContent = props => {
  const currentUser = props.currentUser
  const tabList = props.tabList
  const tabShowIndex = props.tabShowIndex
  const setTabShowIndex = props.setTabShowIndex

  const showNewTab = () => {
    setTabShowIndex(tabList.length)
  }

  let tabDisplayList
  if (tabList.length > 0) {
    tabDisplayList = tabList.map((tab, index) => {
      const indexItemClass = index === tabShowIndex ? "indexItemSelected" : "indexItem"
      return (
        <h5
          className={indexItemClass}
          key={tab.id}
          onClick={() => setTabShowIndex(index)}>
          {tab.title}
        </h5>
      )
    })
  }

  let newTabButton = <h5>Sign in to add new tabs</h5>
  if (currentUser.id != null) {
    newTabButton = (
      <h5 className="indexItem" onClick={() => showNewTab()}>+ New Tab</h5>
    )
  }

  return (
    <div >
      <h4>{currentUser.username}</h4>
      {tabDisplayList}
      {newTabButton}
    </div>
  )
}

export default IndexContent
