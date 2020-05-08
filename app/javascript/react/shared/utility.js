export const convertLineBreaksToParagraphs = (tabContent) => {
  return`<p>${tabContent.trim().replace(/\n/ig, '</p><p>')}</p>`
}

export const insertDashIntoTabContent = (tabContent, curIndex, length = 0) => {
  return tabContent.slice(0, curIndex) + '-' + tabContent.slice(curIndex+length)
}

export const clearStrayFormattingFromText = (text) => {
  let newText = text.replace(/&[^&;]+;| |\./g, '-')
  return newText
}
