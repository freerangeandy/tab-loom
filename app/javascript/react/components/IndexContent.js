import React from 'react'

const IndexContent = props => {
  const currentUser = props.currentUser
  const tabList = props.tabList

  let tabDisplayList
  if (tabList.length > 0) {
    tabDisplayList = tabList.map((tab) => {
      return (<h5 key={tab.id}>{tab.title}</h5>)
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
