import React from 'react'

const IndexContent = props => {
  const currentUser = props.currentUser
  const tabList = props.tabList
  const setTabShowIndex = props.setTabShowIndex

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
    </div>
  )
}

export default IndexContent
